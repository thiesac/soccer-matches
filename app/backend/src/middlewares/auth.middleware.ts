import jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

class AuthMiddleware {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ')[1]; // token
    try {
      req.body.token = jwt.verify(token, this.secretKey);
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    return next();
  }
}

export default AuthMiddleware;
