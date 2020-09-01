const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Stage = require('../../models/Stage');
const Event = require('../../models/Event');
const Vote = require('../../models/Vote');
const Stageresult = require('../../models/Stageresult');

// @route POST api/stages
// @desc insert stage to an event
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('eventid', 'Event id is required').not().isEmpty(),
      check('name', 'Riders date is required').not().isEmpty(),
      check('maxdatevote', 'Max date to vote is required').not().isEmpty(),
      check('type', 'Type is required').not().isEmpty(),
      check('type', 'Type invalid').isIn(['f', 'h', 'm']),
      check('distance', 'Distance is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { eventid, name, maxdatevote, type, distance, url } = req.body;

    //build rider object
    const stageFields = {
      name,
      maxdatevote,
      event: eventid,
      type,
      distance,
      url,
    };

    try {
      const event = await Event.findById(eventid);
      if (!event) {
        return res.status(400).jsonp({ msg: 'Event not found' });
      }
      const stage = new Stage(stageFields);
      await stage.save();

      res.json({
        stage,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route POST api/stages/vote
// @desc insert stage vote
// @access Private
router.post(
  '/vote',
  [
    auth,
    [
      check('stageid', 'Stage id is required').not().isEmpty(),
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
    const { stageid, rider1, rider2, rider3 } = req.body;

    //build rider object
    const voteFields = {
      user: req.user.id,
      stage: stageid,
      date: new Date(),
      rider1,
      rider2,
      rider3,
    };

    try {
      const stage = await Stage.findById(stageid);
      if (!stage) {
        return res.status(400).jsonp({ msg: 'Stage not found' });
      }
      //Validar que este en el rango de fecha para votar
      const maxdatevote = new Date(stage.maxdatevote).getTime();
      const currentDate = new Date().getTime();
      if (currentDate > maxdatevote) {
        return res.status(400).jsonp({
          msg: `Max date to vote was ${new Date(stage.maxdatevote).toString()}`,
        });
      }
      //validar que el usuario no haya votado ya por este stage
      let vote = await Vote.findOne({ stage: stageid, user: req.user.id });
      if (vote) {
        //Update
        vote = await Vote.findOneAndUpdate(
          { stage: stageid, user: req.user.id },
          { $set: voteFields },
          { new: true }
        );
        return res.json(vote);
      }

      vote = new Vote(voteFields);
      await vote.save();

      res.json({
        vote,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route POST api/stages/setResult
// @desc insert stage vote result
// @access Private
router.post(
  '/setResult',
  [
    auth,
    [
      check('stageid', 'Stage id is required').not().isEmpty(),
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
    const { eventid, stageid, rider1, rider2, rider3 } = req.body;

    //build voteresult object
    const voteresultFields = {
      stage: stageid,
      event: eventid,
      rider1,
      rider2,
      rider3,
    };

    try {
      const stage = await Stage.findById(stageid);
      if (!stage) {
        return res.status(400).jsonp({ msg: 'Stage not found' });
      }
      //validar que el usuario no haya votado ya por este stage
      let voteres = await Stageresult.findOne({ stage: stageid });
      if (voteres) {
        //Update
        voteres = await Stageresult.findOneAndUpdate(
          { stage: stageid },
          { $set: voteresultFields },
          { new: true }
        );
        return res.json(voteres);
      }

      voteres = new Stageresult(voteresultFields);
      await voteres.save();

      res.json({
        voteres,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/stages/getListVotes:stage_id
// @desc get list of people votes by stage id
// @access Private
router.get('/getListVotes/:stage_id', [auth], async (req, res) => {
  try {
    const { stage_id } = req.params;

    const stage = await Stage.findById(stage_id);
    if (!stage) {
      return res.status(400).jsonp({ msg: 'Stage not found' });
    }

    const event = await Event.findById(stage.event).populate([
      {
        path: 'creator',
        model: 'User',
        select: 'name avatar',
      },
    ]);
    if (!event) {
      return res.status(400).jsonp({ msg: 'Event not found' });
    }

    const stageResult = await Stageresult.find({ stage: stage_id }).populate([
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
    ]);
    const votes = await Vote.find({ stage: stage_id }).populate([
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
    ]);

    const eventUsers = await Eventusers.find({
      event: stage.event,
    }).populate([
      {
        path: 'user',
        model: 'User',
        select: 'name avatar',
      },
    ]);
    eventUsers.push({ user: event.creator });

    res.json({ stage, event, stageResult, votes, eventUsers });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
