const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  total: {
    type: Number,
    required: true,
  },
  deliveryCost: {
    type: Number,
    default: 16,
  },
  pizzas: [
    {
      pizza: { type: Schema.Types.ObjectId, ref: 'pizza' },
      price: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('order', OrderSchema);
