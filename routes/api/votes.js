const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Podiumvote = require('../../models/Podiumvote');
const Event = require('../../models/Event');

// @route POST api/votes/podium
// @desc register vote for podium
// @access Private
router.post(
  '/podium',
  [
    auth,
    [
      check('rider1', 'Rider 1 is required').not().isEmpty(),
      check('rider2', 'Rider 2 is required').not().isEmpty(),
      check('rider3', 'Rider 3 is required').not().isEmpty(),
      check('eventid', 'Event Id is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { rider1, rider2, rider3, eventid } = req.body;

    //build rider object
    const podiumvoteFields = {};
    podiumvoteFields.event = eventid;
    podiumvoteFields.user = req.user.id;
    podiumvoteFields.rider1 = rider1;
    podiumvoteFields.rider2 = rider2;
    podiumvoteFields.rider3 = rider3;
    podiumvoteFields.date = new Date();
    try {
      const event = await Event.findById(eventid);
      if (!event) {
        return res.status(400).jsonp({
          msg: `Event not found`,
        });
      }

      //Validar que este en el rango de fecha para votar
      const maxdatevote = new Date(event.maxdatevotepodium).getTime();
      const currentDate = new Date().getTime();
      if (currentDate > maxdatevote) {
        return res.status(400).jsonp({
          msg: `Max date to vote was ${new Date(
            event.maxdatevotepodium
          ).toString()}`,
        });
      }

      let podiumvote = new Podiumvote(podiumvoteFields);
      podiumvote.save();

      res.json(podiumvote);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
