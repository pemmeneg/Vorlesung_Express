// nedb Store
var Datastore = require('nedb'), db = new Datastore({filename: 'public/dataStore.db', autoload: true});

class Order{
    constructor(pizzaName, orderedBy){
        this.orderedBy = orderedBy;
        this.pizzaName = pizzaName;
        this.orderDate = new Date();
        this.state = "OK";
    }
}


class OrderStore {
    constructor() {
        this.orders = [];
    }

    add(pizzaName, orderedBy, callback) {
        let order = new Order(pizzaName, orderedBy);
        this.orders.push(order);
        db.insert(order, function (err, newDoc) {
            if(callback) {
                callback(err, newDoc);
            }
        })
    }

    delete(id) {
        db.update({_id:id}, {$set : {state: "DELETED"}}, function (err, numReplaced) {
            console.log(numReplaced);
        });
    }

    get(id, callback) {
        db.findOne({_id:id}, function (err, doc) {
            if(callback) {
                callback(err, doc);
            }
        });
    }

    all() {
        return this.orders;
    }
}

module.exports = new OrderStore();