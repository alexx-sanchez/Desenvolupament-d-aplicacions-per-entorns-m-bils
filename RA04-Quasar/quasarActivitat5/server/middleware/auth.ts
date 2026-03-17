import type { Request, Response, NextFunction } from 'express'

/**
 * Middleware equivalent to requireUserSession() in nuxt-auth-utils.
 * Rejects the request with 401 if no session user is present.
 */
export function requireUserSession(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.user) {
    res.status(401).json({ message: 'No autenticat' })
    return
  }
  next()
}
