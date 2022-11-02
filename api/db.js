const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.br67ona.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('connected to database');
  }).catch((err) => {
    console.log(err);
  });

const messageSchema = new mongoose.Schema({
  nickname: String,
  message: String,
  timestamp: String
});

const Message = mongoose.model('Message', messageSchema);

module.exports = {
  Message,
};
