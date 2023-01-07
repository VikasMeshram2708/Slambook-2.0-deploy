import express, { Request, Response } from 'express';

import UserSchema from '../Models/Auth';

import db from '../db';

import bcryptjs from 'bcryptjs';

import * as jwt from 'jsonwebtoken';

import fetchuser from '../Middlewares/fetchuser';

const User = db.get('users');

const router = express.Router();

// Sign Up Route
router.post('/signUp', async (req: Request, res: Response) => {
  try {
    // validate the body
    const user = await UserSchema.validateAsync(req.body);
    if (user) {
      // check if email is already in use
      const isExist = await User.findOne({
        email: req.body.email,
      });

      if (isExist) {
        return res.status(403).json({
          message: 'Hey, Email is already in use',
        });
      }
      //   hash the password
      const secPass = await bcryptjs.hash(req.body.password, 10);
      user.password = secPass;
      //   insert to DB
      const created = await User.insert(user);
      return res.status(201).json({
        message: 'User Registered Successfully',
        user: created,
      });
    }
    return res.status(422).json({
      message: 'Hey, try to register with valid credentials',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some Internal Server Error',
      error: error,
    });
  }
});

// Sign In Route
router.post('/signIn', async (req: Request, res: Response) => {
  try {
    // Validate the User
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      // compare the password
      const isValidKey = await bcryptjs.compare(
        req.body.password,
        user.password
      );
      if (!isValidKey) {
        return res.status(403).json({
          message:
            'Hey, try to login with valid credentails invalid key provided..',
        });
      }
      //   sign the user with jwt token
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET as string);
      return res.status(201).json({
        message: 'User Logged In Successfully',
        token: authToken,
      });
    }
    // else nothign is proivded
    return res.status(422).json({
      message:
        'Hey, try to  login with valid credentials email or password is invalid..',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some Internal Server Error',
      error: error,
    });
  }
});

// fetch the User details
router.get('/fetchUser', fetchuser, async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      _id: req.body.user._id,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      message: 'Some Internal Server Error',
      error: error,
    });
  }
});

export default router;
