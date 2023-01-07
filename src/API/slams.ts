import express, { Request, Response } from 'express';

import SlamSchema from '../Models/Slams';

import db from '../db';

import fetchuser from '../Middlewares/fetchuser';

const Slams = db.get('slams');

const router = express.Router();

// Create an Slam
router.post('/createSlam', fetchuser, async (req: Request, res: Response) => {
  try {
    const userId = req.body.user._id;

    const { title, description, tag } = req.body;
    // validate the body
    const newSlams = await SlamSchema.validateAsync({
      title,
      description,
      tag,
    });
    if (newSlams) {
      // insert to db
      const created = await Slams.insert({
        title,
        description,
        tag,
        userId,
      });
      return res.status(201).json({
        message: 'Your New Slam Was Successfully Added...',
        data: created,
      });
    }
    return res.status(422).json({
      message: 'Failed to Add your new Slam...',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some Internal Server Error',
      error: error,
    });
  }
});

// Read Created Slam
router.get('/mySlams', fetchuser, async (req, res) => {
  try {
    const items = await Slams.find({
      userId: req.body.user._id,
    });
    if (!items) {
      return res.status(422).json({
        message: 'Failed to find your slams...',
      });
    }
    return res.status(201).json(items.reverse());
  } catch (error) {
    return res.status(500).json({
      message: 'Some Internal Server Error',
      error: error,
    });
  }
});

// Update Created Slam
router.put(
  '/updateSlam/:id',
  fetchuser,
  async (req: Request, res: Response) => {
    try {
      const { title, description, tag } = req.body;

      // validate the body
      const { id } = req.params;

      const value = await SlamSchema.validateAsync({
        title,
        description,
        tag,
      });

      const item = await Slams.findOne({
        _id: id,
      });

      if (!item) {
        return res.status(422).json({
          message: 'Not Found...',
        });
      }

      const updated = await Slams.update(
        {
          _id: id,
        },
        {
          $set: value,
        }
      );
      return res.status(201).json({
        message: value,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Some Internal Server Error',
        error: error,
      });
    }
  }
);

// Delete Created Slam
router.delete('/deleteMySlam/:id', fetchuser, async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Slams.findOne({
      _id: id,
    });

    if (!item) {
      return res.status(422).json({
        message: 'Not Found...',
      });
    }
    await Slams.remove({
      _id: id,
    });
    return res.status(201).json({
      message: 'Success',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Some Internal Server Error',
      error: error,
    });
  }
});

export default router;

// 63b59d022c474d2a9a35c75b
