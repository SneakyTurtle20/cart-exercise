const ShoppingCart = require('./shoppingCart');
const PricingRules = require('./pricingRules');

// Test scenarios
function runTests() {
    const pricingRules = new PricingRules();

    // Scenario 1 - 3 for 2 discount for Unlimited 1GB where you only get charge for 2 when buying 3 Unlimited 1GB.
    const cart1 = new ShoppingCart(pricingRules);
    cart1.add('ult_small');
    cart1.add('ult_small');
    cart1.add('ult_small');
    cart1.add('ult_large');
    console.log('Scenario 1:', cart1.total() === 94.70, cart1.total());
    console.log('Scenario 1 items:', cart1.getItems());

    // Scenario 2 - Bulk discount for Unlimited 5GB when purchase more than 3 items
    const cart2 = new ShoppingCart(pricingRules);
    cart2.add('ult_small');
    cart2.add('ult_small');
    cart2.add('ult_large');
    cart2.add('ult_large');
    cart2.add('ult_large');
    cart2.add('ult_large');
    console.log('Scenario 2:', cart2.total() === 209.40, cart2.total());
    console.log('Scenario 2 items:', cart2.getItems());

    // Scenario 3 - Bundle discount for Unlimited 2GB with free 1GB packs
    const cart3 = new ShoppingCart(pricingRules);
    cart3.add('ult_small');
    cart3.add('ult_medium');
    cart3.add('ult_medium');
    console.log('Scenario 3:', cart3.total() === 84.70, cart3.total());
    console.log('Scenario 3 items:', cart3.getItems());

    // Scenario 4 - Promo Code scenario
    const cart4 = new ShoppingCart(pricingRules);
    cart4.add('ult_small');
    cart4.add('1gb', 'I<3AMAYSIM');
    console.log('Scenario 4:', cart4.total() === 31.32, cart4.total());
    console.log('Scenario 4 items:', cart4.getItems());


    // Scenario 5 - 6 Unlimited 1GB, 1 Unlimited 2GB, 1 Unlimited 5GB
    const cart5 = new ShoppingCart(pricingRules);
    cart5.add('ult_small');
    cart5.add('ult_large');
    cart5.add('ult_small');
    cart5.add('ult_small');
    cart5.add('ult_medium');
    cart5.add('ult_small');
    cart5.add('ult_small');
    cart5.add('ult_small');
    console.log('Scenario 5:', cart5.total() === 174.4, cart5.total());
    console.log('Scenario 5 items:', cart5.getItems());

    // Scenario 6 - For Error handling in case item didn't exist
    // const cart6 = new ShoppingCart(pricingRules);
    // cart6.add('ult_extralarge');
}

runTests();