import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import { db } from '../db/index.js'
import { users } from '../db/schema.js'

export async function throwIfUserExists(email: string) {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email)
  })

  if (existingUser) {
    throw { statusCode: 400, message: 'Usuari ja existent' }
  }
}

export async function registerUser(name: string, email: string, password: string) {
  const res = await db.insert(users).values({
    name,
    email,
    login: email,
    password: await bcrypt.hash(password, 10)
  }).returning()

  const newUser = res.at(0)

  if (!newUser) {
    throw { statusCode: 500, message: "Error al registrar l'usuari" }
  }

  return newUser
}
