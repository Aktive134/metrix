import { Request, Response, NextFunction } from 'express'

const validateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { payload, token } = res.locals
  if (payload && payload.isAdmin) {
    next(token);
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' })
  }
}

export default validateAdmin
