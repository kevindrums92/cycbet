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
});

module.exports = Stage = mongoose.model('Stage', StageSchema);
