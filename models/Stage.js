const mongoose = require('mongoose');

const StageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
  maxdatevote: {
    type: Date,
    default: Date.now,
  },
  //flat:f, hilly:h, mountain: m
  type: {
    type: String,
    required: true,
    default: 'f',
  },
  distance: {
    type: Number,
    required: true,
    default: 0,
  },
  url: {
    type: String,
    required: false,
  },
});

module.exports = Stage = mongoose.model('Stage', StageSchema);
