import { Router } from 'express'
import { eq, and } from 'drizzle-orm'
import { requireUserSession } from '../middleware/auth.js'
import { db } from '../db/index.js'
import { equips } from '../db/schema.js'

const router = Router()

// All routes require authentication
router.use(requireUserSession)

// GET /api/teams  or  GET /api/teams?id=X
router.get('/', async (req, res) => {
  try {
    const userId = Number(req.session.user!.id)
    const { id } = req.query

    if (id) {
      const result = await db.select().from(equips).where(
        and(
          eq(equips.id, Number(id)),
          eq(equips.userId, userId)
        )
      )
      if (!result.length) {
        res.status(404).json({ message: 'Equip no trobat' })
        return
      }
      res.json(result[0])
      return
    }

    const all = await db.select().from(equips).where(eq(equips.userId, userId))
    res.json(all)
  } catch (error) {
    console.error('GET /api/teams error:', error)
    res.status(500).json({ message: "Error en l'aplicació" })
  }
})

// POST /api/teams
router.post('/', async (req, res) => {
  try {
    const userId = Number(req.session.user!.id)
    const { name, country, worldChampionships, photo } = req.body

    const created = await db.insert(equips).values({
      name,
      country,
      worldChampionships,
      photo,
      userId
    }).returning()

    res.json(created[0])
  } catch (error) {
    console.error('POST /api/teams error:', error)
    res.status(500).json({ message: "Error al crear l'equip" })
  }
})

// PUT /api/teams
router.put('/', async (req, res) => {
  try {
    const userId = Number(req.session.user!.id)
    const { id, ...fields } = req.body

    const updated = await db.update(equips)
      .set(fields)
      .where(
        and(
          eq(equips.id, Number(id)),
          eq(equips.userId, userId)
        )
      )
      .returning()

    if (!updated.length) {
      res.status(404).json({ message: 'Equip no trobat o no autoritzat' })
      return
    }
    res.json(updated[0])
  } catch (error) {
    console.error('PUT /api/teams error:', error)
    res.status(500).json({ message: "Error al actualitzar l'equip" })
  }
})

// DELETE /api/teams
router.delete('/', async (req, res) => {
  try {
    const userId = Number(req.session.user!.id)
    const { id } = req.body

    await db.delete(equips).where(
      and(
        eq(equips.id, Number(id)),
        eq(equips.userId, userId)
      )
    )
    res.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/teams error:', error)
    res.status(500).json({ message: "Error al eliminar l'equip" })
  }
})

export default router
