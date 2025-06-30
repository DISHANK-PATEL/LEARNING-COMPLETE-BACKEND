const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/Hotel';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.catch(err => {
  console.error('Initial MongoDB connection error:', err);
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('MongoDB connected');
});

db.on('error', err => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = db;
