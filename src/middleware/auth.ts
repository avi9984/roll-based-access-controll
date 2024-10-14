import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

declare interface CustomRequest extends ExpressRequest {
  user?: any;
}

export const protect = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Access denied, token missing or invalid' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { id: string };
    req.user = await User.findById(decoded.id).select({ password: 0 });
    if (!req.user) {
      res.status(401).json({ message: 'User  not found' });
      return;
    }

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        message: 'Session expired, please log in again.',
        expiredAt: error.expiredAt,
      });
    } else {
      console.log(error);
      res.status(400).json({ message: 'Invalid token' });
      return;
    }
  }
};

export const admin = (req: CustomRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};