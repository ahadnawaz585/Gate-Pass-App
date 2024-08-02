import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { secretKey } from '../environment/environment';
class Authentication {
  public authenticateToken(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): void {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).send('Unauthorized');
      return;
    }

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).send('Invalid token');
      }

      (req as any).decoded = decoded;
      next();
    });
  }
}

export default new Authentication();
