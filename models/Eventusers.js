const mongoose = require('mongoose');

const EventusersSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = Eventusers = mongoose.model('Eventusers', EventusersSchema);
