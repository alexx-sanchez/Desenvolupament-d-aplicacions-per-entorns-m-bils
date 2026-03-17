import express from 'express'
import session from 'express-session'
import { createServer } from 'http'
import path from 'path'
import { fileURLToPath } from 'url'

// Routes
import authRoutes from './routes/auth/index.js'
import teamsRoutes from './api/teams.js'
import adminRoutes from './api/admin.js'
import usersRoutes from './api/users.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: process.env.SESSION_SECRET || 'f1-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dies
  }
}))

// API Routes
app.use('/auth', authRoutes)
app.use('/api/teams', teamsRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/users', usersRoutes)

// Serve Quasar build in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist/spa')
  app.use(express.static(distPath))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

const server = createServer(app)
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})

export default app
