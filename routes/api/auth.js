const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const bycript = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Event = require('../../models/Event');
const Eventusers = require('../../models/Eventusers');
// @route GET api/auth
// @desc Test route
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select('-password');

    const ownEvents = await Event.find({ creator: id });
    const events = await Eventusers.find({ user: id }).populate([
      {
        path: 'event',
        model: 'Event',
        select: 'name startdate code',
        populate: {
          path: 'creator',
          model: 'User',
          select: 'name',
        },
      },
    ]);
    user.events = events;
    user.ownEvents = ownEvents;

    res.json({
      user,
      events,
      ownEvents,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/auth
// @desc Authenticate user & get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //See if the password matches
      const isMatch = await bycript.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
