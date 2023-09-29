import jwt = require('jsonwebtoken');

interface JwtPayload {
  id: number;
  email: string;
  exp?: number;
  role: string;
  username: string;
}

class JwtToken {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateToken(payload: JwtPayload): string {
    const token = jwt.sign(payload, this.secretKey, { expiresIn: '7d' });

    return token;
  }

  extractToken(tokenString: string): JwtPayload | null {
    try {
      const payload = jwt.verify(tokenString, this.secretKey) as JwtPayload;
      return payload;
    } catch (error) {
      return null;
    }
  }

  isTokenExpired(tokenString: string): boolean {
    const payload = this.extractToken(tokenString);

    if (payload) {
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const expiration = payload.exp || 0; // Provide a default value of 0 if 'exp' is undefined
      return expiration <= nowInSeconds;
    }
    return true;
  }
}

export default JwtToken;
