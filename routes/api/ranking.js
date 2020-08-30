const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { getUserTotalPoints } = require('../../utils/voteUtils');

const Event = require('../../models/Event');
const Eventusers = require('../../models/Eventusers');
const Stageresult = require('../../models/Stageresult');
const Podiumresult = require('../../models/Podiumresult');

// @route GET api/ranking/:event_id
// @desc get Ranking by eventId
// @access Private
router.get('/:event_id', [auth], async (req, res) => {
  try {
    const { event_id } = req.params;
    const event = await Event.findById(event_id).populate([
      {
        path: 'creator',
        model: 'User',
        select: 'name avatar',
      },
    ]);
    if (!event) {
      return res.status(400).jsonp({ msg: 'Event not found' });
    }

    const eventUsers = await Eventusers.find({
      event: event_id,
    }).populate([
      {
        path: 'user',
        model: 'User',
        select: 'name avatar',
      },
    ]);
    eventUsers.push({ user: event.creator });

    const stageResults = await Stageresult.find({
      event: event_id,
    });

    const podiumResults = await Podiumresult.find({ event: event_id });
    const ranking = [];
    for (let index = 0; index < eventUsers.length; index++) {
      const { user } = eventUsers[index];
      const votes = await Vote.find({ user: user.id });

      const podiumvotes = await Podiumvote.find({ user: user.id });

      const { points: totalPoints, assertions } = getUserTotalPoints(
        votes,
        podiumvotes,
        stageResults,
        podiumResults,
        event_id
      );

      ranking.push({
        user,
        totalPoints,
        assertions,
      });
    }
    ranking.sort((a, b) => b.totalPoints - a.totalPoints);

    res.json({ event, ranking });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
