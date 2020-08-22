const mongoose = require('mongoose');

const RiderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
});

module.exports = Rider = mongoose.model('Rider', RiderSchema);
