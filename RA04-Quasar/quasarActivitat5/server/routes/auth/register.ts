import { Router } from 'express'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import { db } from '../../db/index.js'
import { users } from '../../db/schema.js'

const router = Router()

// POST /auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // 1. Comprovar camps
    if (!name || !email || !password) {
      res.status(400).json({ message: 'Falten camps per introduir' })
      return
    }

    // 2. Comprovar si usuari existeix
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (existingUser) {
      res.status(400).json({ message: 'Usuari ja existent' })
      return
    }

    // 3. Crear usuari amb password hashat
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.insert(users).values({
      name,
      email,
      login: email,
      password: hashedPassword
    }).returning()

    const newUser = result.at(0)

    if (!newUser) {
      res.status(500).json({ message: "Error al registrar l'usuari" })
      return
    }

    // 4. Crear sessió
    const { password: _pw, ...userWithoutPassword } = newUser
    req.session.user = userWithoutPassword

    res.json(userWithoutPassword)
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: "Error en l'aplicació" })
  }
})

export default router
