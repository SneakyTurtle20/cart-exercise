class PricingRules {
    applyBulkDiscount(items) {
        // Bulk discount on Unlimited 5GB
        const ult5GBCount = items.filter(item => item === 'ult_large').length;
        const ult5GBDiscount = ult5GBCount > 3;
        
        return { ult5GBDiscount };
    }

    applyBundleDeals(items) {
        // Free 1GB Data-pack with Unlimited 2GB
        const ult2GBCount = items.filter(item => item === 'ult_medium').length;
        return { free1GBPacks: ult2GBCount };
    }

    applyPromoCode(total, promoCode) {
        if (promoCode === 'I<3AMAYSIM') {
            return total * 0.9; // 10% discount
        }
        return total;
    }
}

module.exports = PricingRules;