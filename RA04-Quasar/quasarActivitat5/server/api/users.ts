import { Router } from 'express'
import { requireUserSession } from '../middleware/auth.js'
import { db } from '../db/index.js'
import { users } from '../db/schema.js'

const router = Router()

// GET /api/users - equivalent to server/api/users.ts in Nuxt
router.get('/', requireUserSession, async (_req, res) => {
  try {
    const all = await db.select().from(users)
    res.json(all)
  } catch (error) {
    console.error('GET /api/users error:', error)
    res.status(500).json({ message: "Error en l'aplicació" })
  }
})

export default router
