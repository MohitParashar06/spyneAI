const express = require('express');
const Car = require('../models/Car');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create a car
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, tags, images } = req.body;
  const car = new Car({ userId: req.user._id, title, description, tags, images });
  await car.save();
  res.json(car);
});

// List user cars
router.get('/', authMiddleware, async (req, res) => {
  const cars = await Car.find({ userId: req.user._id });
  res.json(cars);
});

// Search cars by title, description, or tags
router.get('/search', authMiddleware, async (req, res) => {
  const { keyword } = req.query;
  const cars = await Car.find({
    userId: req.user._id,
    $or: [
      { title: new RegExp(keyword, 'i') },
      { description: new RegExp(keyword, 'i') },
      { tags: new RegExp(keyword, 'i') }
    ]
  });
  res.json(cars);
});

// Get specific car details
router.get('/:id', authMiddleware, async (req, res) => {
  const car = await Car.findOne({ _id: req.params.id, userId: req.user._id });
  res.json(car);
});

// Update a car
router.put('/:id', authMiddleware, async (req, res) => {
  const updates = req.body;
  const car = await Car.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    updates,
    { new: true }
  );
  res.json(car);
});

// Delete a car
router.delete('/:id', authMiddleware, async (req, res) => {
  await Car.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  res.send('Car deleted');
});

module.exports = router;
