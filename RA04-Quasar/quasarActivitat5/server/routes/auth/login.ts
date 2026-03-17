import { Router } from 'express'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import { db } from '../../db/index.js'
import { users } from '../../db/schema.js'

const router = Router()

// POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // 1. Comprovar que estiguin tots els camps
    if (!email || !password) {
      res.status(400).json({ message: 'Falten camps per introduir' })
      return
    }

    // 2. Cercar usuari
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email)
    })

    if (!existingUser) {
      res.status(400).json({ message: 'Usuari no existeix' })
      return
    }

    if (!existingUser.password) {
      res.status(400).json({ message: 'Invalid password Github' })
      return
    }

    // 3. Verificar password
    const isValid = await bcrypt.compare(password, existingUser.password)

    if (!isValid) {
      res.status(400).json({ message: 'Incorrect password' })
      return
    }

    // 4. Crear sessió (equivalent a setUserSession)
    const { password: _pw, ...userWithoutPassword } = existingUser
    req.session.user = userWithoutPassword

    res.json(userWithoutPassword)
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: "Error en l'aplicació" })
  }
})

export default router
