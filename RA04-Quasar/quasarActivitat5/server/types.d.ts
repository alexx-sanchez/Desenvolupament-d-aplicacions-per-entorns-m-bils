import 'express-session'

declare module 'express-session' {
  interface SessionData {
    user?: {
      id?: number
      name?: string
      email?: string
      login?: string
    }
  }
}

declare module 'express' {
  interface Request {
    session: import('express-session').Session & Partial<import('express-session').SessionData>
  }
}
