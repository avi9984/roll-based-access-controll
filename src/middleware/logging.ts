import { Request, Response, NextFunction } from 'express';

export const logRequests = (req: Request, _: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Pass control to the next middleware or route handler
};
