const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Event = require('../../models/Event');

const Eventusers = require('../../models/Eventusers');

// @route POST api/event
// @desc Create or update event
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('startdate', 'Start date is required').not().isEmpty(),
      check('code', 'Code is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, startdate, code } = req.body;

    //build event object
    const eventFields = {};
    eventFields.creator = req.user.id;
    eventFields.name = name;
    eventFields.startdate = startdate;
    eventFields.code = code;
    try {
      //Create
      const event = new Event(eventFields);

      await event.save();
      res.json(event);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route POST api/event/registerUser
// @desc Add user to a event
// @access Private
router.post(
  '/registerUser',
  [auth, [check('eventcode', 'Event Code is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { eventcode } = req.body;

    const eventusersFields = {};
    eventusersFields.user = req.user.id;
    try {
      //get event id by code
      let event = await Event.findOne({ code: eventcode });
      if (!event) {
        return res.status(400).jsonp({ msg: 'Event not found' });
      }

      eventusersFields.event = event.id;

      //Create
      const eventusers = new Eventusers(eventusersFields);

      await eventusers.save();
      res.json(eventusers);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
