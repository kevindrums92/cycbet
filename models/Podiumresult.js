const mongoose = require('mongoose');

const PodiumresultSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  rider1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider',
  },
  rider2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider',
  },
  rider3: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider',
  },
});

module.exports = Podiumresult = mongoose.model(
  'Podiumresult',
  PodiumresultSchema
);
