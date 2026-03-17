import { db } from './index.js'
import { users, equips } from './schema.js'
import bcrypt from 'bcrypt'

async function seed() {
  console.log('🌱 Seeding database...')

  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 10)

  const [user] = await db.insert(users).values({
    name: 'Admin Demo',
    email: 'admin@f1.com',
    login: 'admin@f1.com',
    password: hashedPassword
  }).returning()

  console.log('✅ User created:', user.email)

  // Create demo teams
  await db.insert(equips).values([
    {
      name: 'Red Bull Racing',
      country: 'Austria',
      worldChampionships: 6,
      photo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Red_Bull_Racing_logo.svg/400px-Red_Bull_Racing_logo.svg.png',
      userId: user.id!
    },
    {
      name: 'Ferrari',
      country: 'Itàlia',
      worldChampionships: 16,
      photo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Scuderia_Ferrari_HP_logo.svg/400px-Scuderia_Ferrari_HP_logo.svg.png',
      userId: user.id!
    },
    {
      name: 'Mercedes',
      country: 'Alemanya',
      worldChampionships: 8,
      photo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Mercedes_AMG_Petronas_F1_Logo.svg/400px-Mercedes_AMG_Petronas_F1_Logo.svg.png',
      userId: user.id!
    }
  ])

  console.log('✅ Teams created')
  console.log('🎉 Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed error:', err)
  process.exit(1)
})
