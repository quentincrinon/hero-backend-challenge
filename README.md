# hero-backend-challenge

### Installing

Clone the repository on your machine and install all the dependences.

```
git clone git@github.com:quentincrinon/hero-backend-challenge.git
cd hero-backend-challenge
npm install
```

Then run the server:

```
npm start run
```

(The server uses the port 3000)

### Use

You can use Postman to test the API (https://www.getpostman.com).

#### POST a list of events
```
http://localhost:3000/events
```

Events sample :
```
[
  {
    "type": "product-view",
    "merchant": "iWU4p9dJ9m",
    "user": "e5d54832-52ea-44c8-9307-a98a347d15bc",
    "time": "2018-03-23T18:25:43.511Z",
    "data": {
      "product": {
        "sku_code": "220309"
      },
      "location": "https://website.com/product/220309"
    }
  },
  {
    "type": "transaction",
    "merchant": "yyy",
    "user": "dqw-dwww-wdqwq",
    "time": "2018-03-23T18:30:43.511Z",
    "data": {
      "transaction": {
        "order_id": "xxxxx1",
        "subtotal": 50,
        "total": 55,
        "line_items": [
          {
            "product": {
              "sku_code": "887447498177",
              "price": 20
            },
            "quantity": 1,
            "subtotal": 20
          },
          {
            "product": {
              "sku_code": "887447498139",
              "price": 10
            },
            "quantity": 3,
            "subtotal": 30
          }
        ]
      }
    }
  }
]
```

#### Get a summary for a specific merchant : 
```
http://localhost:3000/events/yyy
```

Response example :
```
{
    "total_events": 1,
    "number_of_customers": 1,
    "events_summary": [
        {
            "type": "product-view",
            "total_events": 0,
            "number_of_customers": 0
        },
        {
            "type": "transaction",
            "total_events": 2,
            "number_of_customers": 1,
            "total_value": 387.20000000000005
        }
    ]
}
```

#### Get the list of all the events :
```
http://localhost:3000/events
```

Response example :
```
[
    {
        "_id": "5b3371584c30b4617958b287",
        "type": "transaction",
        "merchant": "yyy",
        "user": "dqw-dwww-wdqwq",
        "time": "2018-03-23T18:30:43.511Z",
        "data": {
            "transaction": {
                "order_id": "xxxxx1",
                "subtotal": 352,
                "total": 387.20000000000005,
                "line_items": [
                    {
                        "product": {
                            "sku_code": "887447498177",
                            "title": "John Varvatos Cotton Eyelet Crewneck",
                            "images": [
                                "https://dev.backend.usehero.com/utils/smartcrop?url=http%3A%2F%2Fi1.adis.ws%2Fi%2Fjohnvarvatos%2FK1213R2B-KW3B1-057-A%2FCotton-Eyelet-Crewneck.jpg%3Fimg404%3Dproduct-image-not-found%26%24productdetailprimary%24"
                            ],
                            "url": "https://www.johnvarvatos.com/cotton-eyelet-crewneck/887447498177.html",
                            "retailer": "johnvarvatos.com",
                            "price": "$88",
                            "id": "johnvarvatos.com887447498177"
                        },
                        "quantity": 1,
                        "subtotal": 88
                    },
                    {
                        "product": {
                            "sku_code": "887447498139",
                            "title": "John Varvatos Cotton Eyelet Crewneck",
                            "images": [
                                "https://dev.backend.usehero.com/utils/smartcrop?url=http%3A%2F%2Fi1.adis.ws%2Fi%2Fjohnvarvatos%2FK1213R2B-KW3B1-057-A%2FCotton-Eyelet-Crewneck.jpg%3Fimg404%3Dproduct-image-not-found%26%24productdetailprimary%24"
                            ],
                            "url": "https://www.johnvarvatos.com/cotton-eyelet-crewneck/887447498139.html",
                            "retailer": "johnvarvatos.com",
                            "price": "$88",
                            "id": "johnvarvatos.com887447498139"
                        },
                        "quantity": 3,
                        "subtotal": 264
                    }
                ]
            }
        },
        "__v": 0
    },
    {
        "_id": "5b3371584c30b4617958b286",
        "type": "product-view",
        "merchant": "iWU4p9dJ9m",
        "user": "e5d54832-52ea-44c8-9307-a98a347d15bc",
        "time": "2018-03-23T18:25:43.511Z",
        "data": {
            "product": {
                "sku_code": "220309",
                "title": "John Hardy Men's Classic Chain 12MM Station Bracelet in Sterling Silver and Leather",
                "images": [
                    "https://www.johnhardy.com/on/demandware.static/-/Sites-master-catalog/default/dw9029c0ca/images/large/BM99652BL_Main.jpg"
                ],
                "url": "http://www.johnhardy.com/classic-chain-12mm-station-bracelet-in-silver-and-leather-/220309.html",
                "retailer": "johnhardy.com",
                "price": "$595",
                "id": "johnhardy.com220309"
            },
            "location": "https://website.com/product/220309"
        },
        "__v": 0
    }
]
```

## Author

* **Quentin Crinon** - [quentincrinon](https://github.com/quentincrinon)

June 2018
