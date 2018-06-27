'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EventSchema = new Schema({
  type: {
    type: String,
    enum: ['product-view','transaction'],
    required: true
  },
  merchant: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  data: {
    type: Schema.Types.Mixed,
    required: true
  }
});

module.exports = mongoose.model('Events', EventSchema);