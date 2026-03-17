import { eq, and } from 'drizzle-orm'
import { db } from '../db/index.js'
import { equips } from '../db/schema.js'

export async function throwIfEquipExist(name: string, userId: number) {
  const existingEquip = await db.query.equips.findFirst({
    where: and(
      eq(equips.name, name),
      eq(equips.userId, userId)
    )
  })

  if (existingEquip) {
    throw { statusCode: 400, message: 'Equip ja existent' }
  }
}

export async function createEquip(
  name: string,
  country: string,
  worldChampionships: number,
  photo: string,
  userId: number
) {
  const res = await db.insert(equips).values({
    userId,
    name,
    country,
    worldChampionships,
    photo
  }).returning()

  const newEquip = res.at(0)

  if (!newEquip) {
    throw { statusCode: 500, message: "Error al crear l'equip" }
  }

  return newEquip
}
