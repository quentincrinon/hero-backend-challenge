'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
  sku_code: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  images: {
    type: [String]
  },
  url: {
    type: String
  },
  retailer: {
    type: String
  },
  price: {
    type: String
  },
  id: {
    type: String
  }
});

module.exports = mongoose.model('Products', ProductSchema);