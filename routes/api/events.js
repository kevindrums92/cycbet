const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Event = require('../../models/Event');
const Rider = require('../../models/Rider');
const Stage = require('../../models/Stage');
const Vote = require('../../models/Vote');
const Podiumvote = require('../../models/Podiumvote');
const Stageresult = require('../../models/Stageresult');
const Podiumresult = require('../../models/Podiumresult');

const Eventusers = require('../../models/Eventusers');
const { findOneAndUpdate } = require('../../models/Stage');

const { getUserTotalPoints } = require('../../utils/voteUtils');

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
      check('maxdatevotepodium', 'Max date to vote podium is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, startdate, code, maxdatevotepodium, id } = req.body;
    //build event object
    const eventFields = {};
    eventFields.creator = req.user.id;
    eventFields.name = name;
    eventFields.startdate = startdate;
    eventFields.code = code;
    eventFields.maxdatevotepodium = maxdatevotepodium;
    try {
      //Create
      let event;
      if (id) {
        event = await Event.findById(id);
        if (!event) {
          return res.status(400).jsonp({ msg: 'Event not found' });
        }
        event = await Event.findOneAndUpdate(
          { _id: id },
          { $set: eventFields },
          { new: true }
        );
        res.json(event);
      } else {
        const eventSameCode = await Event.findOne({ code: code });
        if (eventSameCode) {
          return res
            .status(400)
            .jsonp({ msg: 'There is an event created with this code' });
        }
        event = new Event(eventFields);

        await event.save();
        res.json(event);
      }
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

      //validate if the user already exists in the event
      let eventUser = await Eventusers.findOne({
        event: event.id,
        user: req.user.id,
      });
      if (eventUser) {
        return res.status(400).jsonp({ msg: 'User already joined this event' });
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

const ridersPopulateObject = [
  {
    path: 'rider1',
    model: 'Rider',
    select: 'name',
  },
  {
    path: 'rider2',
    model: 'Rider',
    select: 'name',
  },
  {
    path: 'rider3',
    model: 'Rider',
    select: 'name',
  },
];

// @route GET api/event/getDataForUser/:user_id
// @desc Get event data by event Id
// @access Private
router.get('/getDataForUser/:event_id', [auth], async (req, res) => {
  try {
    const { id } = req.user;
    const { event_id } = req.params;
    const event = await Event.findById(event_id).populate([
      {
        path: 'creator',
        model: 'User',
        select: 'name',
      },
    ]);
    if (!event) {
      return res.status(400).jsonp({ msg: 'Event not found' });
    }

    const riders = await Rider.find({ event: event_id });

    const stages = await Stage.find({ event: event_id });

    const votes = await Vote.find({ user: id }).populate(ridersPopulateObject);

    const podiumvotes = await Podiumvote.find({ user: id }).populate(
      ridersPopulateObject
    );

    const stageResults = await Stageresult.find({ event: event_id }).populate(
      ridersPopulateObject
    );

    const podiumResults = await Podiumresult.find({ event: event_id }).populate(
      ridersPopulateObject
    );

    const { points: totalPoints } = getUserTotalPoints(
      votes,
      podiumvotes,
      stageResults,
      podiumResults,
      event_id
    );

    res.json({
      event,
      riders,
      stages,
      votes,
      podiumvotes,
      stageResults,
      podiumResults,
      totalPoints,
    });
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      return res.status(400).jsonp({ msg: 'Event not found' });
    }
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/events/vote
// @desc insert podium vote
// @access Private
router.post(
  '/vote',
  [
    auth,
    [
      check('eventid', 'Event id is required').not().isEmpty(),
      check('rider1', 'Rider 1 is required').not().isEmpty(),
      check('rider2', 'Rider 2 is required').not().isEmpty(),
      check('rider3', 'Rider 3 is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { eventid, rider1, rider2, rider3 } = req.body;

    //build rider object
    const podiumvoteFields = {
      user: req.user.id,
      event: eventid,
      date: new Date(),
      rider1,
      rider2,
      rider3,
    };

    try {
      const event = await Event.findById(eventid);
      if (!event) {
        return res.status(400).jsonp({ msg: 'Event not found' });
      }
      //validar que el usuario no haya votado ya por este stage
      let podiumvote = await Podiumvote.findOne({
        event: eventid,
        user: req.user.id,
      });
      if (podiumvote) {
        //Update
        podiumvote = await Podiumvote.findOneAndUpdate(
          {
            event: eventid,
            user: req.user.id,
          },
          { $set: podiumvoteFields },
          { new: true }
        );
        return res.json(podiumvote);
      }

      podiumvote = new Podiumvote(podiumvoteFields);
      await podiumvote.save();

      res.json({
        podiumvote,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route POST api/events/setPodiumResult
// @desc insert podium result
// @access Private
router.post(
  '/setPodiumResult',
  [
    auth,
    [
      check('eventid', 'Event id is required').not().isEmpty(),
      check('rider1', 'Rider 1 is required').not().isEmpty(),
      check('rider2', 'Rider 2 is required').not().isEmpty(),
      check('rider3', 'Rider 3 is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { eventid, rider1, rider2, rider3 } = req.body;

    //build object
    const podiumresFields = {
      event: eventid,
      rider1,
      rider2,
      rider3,
    };

    try {
      const event = await Event.findById(eventid);
      if (!event) {
        return res.status(400).jsonp({ msg: 'Event not found' });
      }
      //validar que el usuario no haya votado ya por este stage
      let podiumres = await Podiumresult.findOne({
        event: eventid,
      });
      if (podiumres) {
        //Update
        podiumres = await Podiumresult.findOneAndUpdate(
          {
            event: eventid,
          },
          { $set: podiumresFields },
          { new: true }
        );
        return res.json(podiumres);
      }

      podiumres = new Podiumresult(podiumresFields);
      await podiumres.save();

      res.json({
        podiumres,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
