import jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

const secretKey = process.env.JWT_SECRET || 'jwt_secret';
class AuthMiddleware {
  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ')[1]; // to get token

    try {
      console.log('é o token', token);
      req.body.token = jwt.verify(token, secretKey);
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default AuthMiddleware;
