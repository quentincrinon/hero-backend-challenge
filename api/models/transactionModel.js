'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TransactionSchema = new Schema({
  order_id: {
    type: String,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  line_items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Products'
    },
    quantity: {
      type: String,
      required: true
    },
    subtotal: {
      type: String,
      required: true
    }
  }]
});

module.exports = mongoose.model('Transactions', TransactionSchema);