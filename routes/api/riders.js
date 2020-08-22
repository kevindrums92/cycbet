const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Rider = require('../../models/Rider');

// @route POST api/rider
// @desc inser massive riders to an event
// @access Private
router.post(
  '/massiveRegister',
  [
    auth,
    [
      check('eventid', 'Event id is required').not().isEmpty(),
      check('riders', 'Riders date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { eventid, riders } = req.body;

    //build rider object
    const riderFields = {};
    riderFields.event = eventid;
    try {
      const ridersSplited = riders.split(',');
      ridersSplited.forEach(async (element) => {
        //Create rider
        riderFields.name = element.trim();
        const rider = new Rider(riderFields);
        await rider.save();
      });

      res.status(200).send('Save successfully');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
