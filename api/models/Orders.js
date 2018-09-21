const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Orders', ordersSchema);
