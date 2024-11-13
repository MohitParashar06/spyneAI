const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  const user = new User({ username, password , email});
  await user.save();
  res.send('User registered');
});

router.post('/login', async (req, res) => { 
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid credentials');
  }
  const token = jwt.sign({ _id: user._id }, 'carapplication');
  res.json({ token });
});

module.exports = router;
