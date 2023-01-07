import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const fetchuser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('authToken');
    if (!token) {
      return res.status(422).json({
        message: 'Hey, failed to authenticate the token',
      });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.user = data;
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Some Internal Server Error',
      error: error,
    });
  }
};

export default fetchuser;
