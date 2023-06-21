import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { unauthorizedError } from '@/errors/unauthorized-error';

export async function auth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return generateUnauthorizedResponse(res);
  }
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    req.userId = userId;

    res.locals.userId = userId;

    next();
  } catch (err) {
    res.status(401).send('Please authenticate');
  }
};

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};