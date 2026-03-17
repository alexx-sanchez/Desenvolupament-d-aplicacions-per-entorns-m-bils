import { Router } from 'express'
import loginRouter from './login.js'
import registerRouter from './register.js'
import githubRouter from './github.js'

const router = Router()

router.use(loginRouter)
router.use(registerRouter)
router.use(githubRouter)

// GET /auth/session - equivalent to useUserSession()
router.get('/session', (req, res) => {
  if (req.session?.user) {
    res.json({ user: req.session.user })
  } else {
    res.json({ user: null })
  }
})

// POST /auth/logout - equivalent to clear() in useUserSession()
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true })
  })
})

export default router
