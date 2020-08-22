const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  stage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stage',
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

module.exports = Vote = mongoose.model('Vote', VoteSchema);
