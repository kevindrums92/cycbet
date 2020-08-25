const mongoose = require('mongoose');
const config = require('config');
require('dotenv').config();
const db = process.env.REACT_APP_MONGOURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.log(err);
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
