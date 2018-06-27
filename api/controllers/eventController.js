'use strict';


let mongoose = require('mongoose'),
  request = require('request'),
  Event = mongoose.model('Events'),
  Product = mongoose.model('Products');

exports.list_all_events = function (req, res) {
  Event.find({}, function (err, event) {
    if (err)
      res.send(err);
    res.json(event);
  });
};


exports.create_events = function (req, res) {
  let events = []
  Promise.all(req.body.map(event => {
    let new_event = new Event(event);

    if (new_event.type === 'product-view') {
      return getProductDetails(new_event.merchant, new_event.data.product.sku_code)
        .then((productDetails) => {
          new_event.data.product = productDetails
          return new_event.save().then(eventSaved => {
            events.push(eventSaved)
            return eventSaved
          })
          .catch(err => {
            console.log(err)
            return null
          })
        })
    } else {
      new_event.data.transaction.subtotal = 0
      return Promise.all(new_event.data.transaction.line_items.map((item, index) => {
        return getProductDetails(new_event.merchant, item.product.sku_code)
          .then((productDetails) => {
            new_event.data.transaction.line_items[index].product = productDetails
            let price = parseInt(productDetails.price.split('$')[1])
            new_event.data.transaction.line_items[index].subtotal = price * new_event.data.transaction.line_items[index].quantity
            new_event.data.transaction.subtotal += new_event.data.transaction.line_items[index].subtotal
          })
      })).then(() => {
        new_event.data.transaction.total = new_event.data.transaction.subtotal * 1.1
        return new_event.save().then(eventSaved => {
          events.push(eventSaved)
          return eventSaved
        }).catch(err => {
          console.log(err)
          return null
        })

      })
    }
  })).then(() => {
    res.json(events)
  });
};


exports.get_merchant_events = function (req, res) {
  Event.find({ merchant: req.params.merchantId }, function (err, events) {
    if (err) {
      res.send(err);
    }

    let nb_pv_customers = 0,
      nb_transaction_customers = 0,
      nb_pv = 0,
      nb_transactions = 0,
      total_value = 0,
      customers = [],
      pv_customers = [],
      transaction_customers = []
      events.map((e) => {
      customers.indexOf(e.user) === -1 ? customers.push(e.user) : ''
      if (e.type === 'product-view') {
        pv_customers.indexOf(e.user) === -1 ? pv_customers.push(e.user) : ''
        nb_pv_customers += 1
        nb_pv += 1
      } else {
        transaction_customers.indexOf(e.user) === -1 ? transaction_customers.push(e.user) : ''
        nb_transaction_customers += 1
        nb_transactions += e.data.transaction.line_items.length
        total_value += e.data.transaction.total
      }
      return
    })

    let summary = {
      'total_events': events.length,
      'number_of_customers': customers.length,
      'events_summary': [{
        "type": "product-view",
        "total_events": nb_pv,
        "number_of_customers": pv_customers.length
      },
      {
        "type": "transaction",
        "total_events": nb_transactions,
        "number_of_customers": transaction_customers.length,
        "total_value": total_value
      }]
    }
    res.json(summary);
  });
};


const getProductDetails = (merchant, sku_code) => {
  return new Promise((resolve, reject) => {
    let username = 'x-hero-merchant-id',
      password = merchant,
      url = `http://${username}:${password}@dev.backend.usehero.com/products/${sku_code}`,
      productDetails = '';

    request({ url: url }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(JSON.parse(body))
      } else {
        reject()
      }
    });
  })
}