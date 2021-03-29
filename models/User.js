const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    street: {
      type: Number,
      required: true,
    },
    house: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', UserSchema);
