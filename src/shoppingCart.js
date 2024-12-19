const PRODUCTS = require('./products');
const PricingRules = require('./pricingRules');

class ShoppingCart {
    constructor(pricingRules) {
        this.pricingRules = pricingRules || new PricingRules();
        this.items = [];
        this.promoCode = null;
    }

    add(item, promoCode = null) {
        let itemFound = PRODUCTS[item];
        if (itemFound) {
        this.items.push(item);
        } else {
            throw new Error ('Item not found');
        }
        if (promoCode) {
            this.promoCode = promoCode;
        }
    }

    total() {
        let total = 0;
        const { ult5GBDiscount } = this.pricingRules.applyBulkDiscount(this.items);

        // Calculate total with discounts
        let countForUltSmall = 0;
        this.items.forEach((item) => {
            if (item === 'ult_small') {
                countForUltSmall++;
                // Only charge for 2 out of every 3 Unlimited 1GB SIMs
                if (countForUltSmall % 3 !== 0) {
                    total += PRODUCTS[item].price;
                }
            } else if (item === 'ult_large') {
                total += ult5GBDiscount > 0 ? 39.90 : PRODUCTS[item].price;
            } else {
                total += PRODUCTS[item].price;
            }
        });

        // Apply promo code discount
        total = this.pricingRules.applyPromoCode(total, this.promoCode);

        return Number(total.toFixed(2));
    }

    getItems() {
        const itemsList = [...this.items];
        const { free1GBPacks } = this.pricingRules.applyBundleDeals(this.items);
        
        // Add free 1GB Data-packs
        for (let i = 0; i < free1GBPacks; i++) {
            itemsList.push('1gb');
        }
        
        return itemsList;
    }
}

module.exports = ShoppingCart;