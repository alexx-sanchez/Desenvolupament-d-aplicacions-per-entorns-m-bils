import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { users } from '../../db/schema.js'

const router = Router()

/**
 * GitHub OAuth flow using @octokit/oauth-app (lightweight, no passport needed).
 *
 * Required env vars:
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 *   GITHUB_CALLBACK_URL  (e.g. http://localhost:3001/auth/github/callback)
 */

// GET /auth/github  →  redirect to GitHub
router.get('/github', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID
  if (!clientId) {
    res.status(500).json({ message: 'GitHub OAuth no configurat. Afegeix GITHUB_CLIENT_ID al .env' })
    return
  }
  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'user:email',
    redirect_uri: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3001/auth/github/callback'
  })
  res.redirect(`https://github.com/login/oauth/authorize?${params}`)
})

// GET /auth/github/callback  →  exchange code for token, create/find user, set session
router.get('/github/callback', async (req, res) => {
  try {
    const { code } = req.query

    if (!code) {
      res.redirect('/?error=github_no_code')
      return
    }

    // 1. Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      })
    })
    const tokenData = await tokenResponse.json() as { access_token?: string }

    if (!tokenData.access_token) {
      res.redirect('/?error=github_token_failed')
      return
    }

    // 2. Fetch GitHub user info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: 'application/vnd.github+json'
      }
    })
    const githubUser = await userResponse.json() as { login: string; name: string; email?: string }

    // 3. Fetch email if not public
    let email = githubUser.email
    if (!email) {
      const emailResponse = await fetch('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` }
      })
      const emails = await emailResponse.json() as { email: string; primary: boolean; verified: boolean }[]
      email = emails.find(e => e.primary && e.verified)?.email || null
    }

    if (!email) {
      res.redirect("/?error=github_no_email")
      return
    }

    // 4. Cercar o crear usuari a la BD (equivalent a la lògica de github.get.ts)
    let existingUser = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (!existingUser) {
      const result = await db.insert(users).values({
        email,
        login: githubUser.login,
        name: githubUser.name
      }).returning()
      existingUser = result.at(0)
    }

    if (!existingUser) {
      res.redirect("/?error=github_db_error")
      return
    }

    // 5. Crear sessió
    const { password: _pw, ...userWithoutPassword } = existingUser
    req.session.user = userWithoutPassword

    // 6. Tancar popup i redirigir (equivalent a sendRedirect(event, '/'))
    res.send(`
      <script>
        if (window.opener) {
          window.opener.postMessage('oauth-success', '*')
          window.close()
        } else {
          window.location.href = '/'
        }
      </script>
    `)
  } catch (error) {
    console.error('GitHub OAuth callback error:', error)
    res.redirect('/?error=github_error')
  }
})

export default router
