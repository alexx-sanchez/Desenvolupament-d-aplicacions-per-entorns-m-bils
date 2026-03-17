import { Router } from 'express'
import { requireUserSession } from '../middleware/auth.js'

const router = Router()

// GET /api/admin - equivalent to server/api/admin.ts in Nuxt
router.get('/', requireUserSession, (req, res) => {
  res.json({ sensitive: 'logged-only' })
})

export default router
