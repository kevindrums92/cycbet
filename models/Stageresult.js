const mongoose = require('mongoose');

const StageresultSchema = new mongoose.Schema({
  stage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stage',
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
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

module.exports = Stageresult = mongoose.model('Stageresult', StageresultSchema);
