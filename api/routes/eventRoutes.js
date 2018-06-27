'use strict';
module.exports = function(app) {
  var event = require('../controllers/eventController');

  // todoList Routes
  app.route('/events')
    .get(event.list_all_events)
    .post(event.create_events);


  app.route('/events/:merchantId')
    .get(event.get_merchant_events)

};