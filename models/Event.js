const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  startdate: {
    type: Date,
    default: Date.now,
  },
  code: {
    type: String,
    required: true,
  },
});

module.exports = Event = mongoose.model('Event', EventSchema);
