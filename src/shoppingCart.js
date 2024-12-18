const PRODUCTS = require('./products');

class ShoppingCart {
    constructor() {
        this.items = [];
        this.promoCode = null;
    }

    add(item, promoCode = null) {
        this.items.push(item);
        if (promoCode) {
            this.promoCode = promoCode;
        }
    }

    total() {
        let total = 0;

        // Calculate Total price of Cart
        this.items.forEach((item) => {
            total += PRODUCTS[item].price;
        });

        return Number(total.toFixed(2));
    }

    getItems() {
        return this.items;
    }
}

module.exports = ShoppingCart;