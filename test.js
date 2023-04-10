class Checkout {
    // The constructor takes a set of pricing rules as input and initializes an empty basket of items
    constructor(pricingRules) {
      this.items = {};
      this.pricingRules = pricingRules;
    }
  
    // The scan method adds an item to the basket and increments its quantity
    scan(item) {
      if (!this.items[item]) {
        this.items[item] = 1;
      } else {
        this.items[item]++;
      }
    }
  
    // The calculateTotal method computes the total cost of all items in the basket according to the pricing rules
    calculateTotal() {
      let total = 0;
      for (const [item, quantity] of Object.entries(this.items)) {
        const price = this.calculatePrice(item, quantity);
        total += price;
      }
      return total;
    }
  
    // The calculatePrice method computes the price of a given item and quantity based on its pricing rule
    calculatePrice(item, quantity) {
      const pricingRule = this.pricingRules[item];
      if (!pricingRule) {
        throw new Error(`No pricing rule found for item ${item}`);
      }
  
      let price = 0;
      if (pricingRule.unitPrice && !pricingRule.specialPrice) {
        // If the item has a unit price but no special price, simply multiply the unit price by the quantity
        price = pricingRule.unitPrice * quantity;
      } else if (pricingRule.specialPrice) {
        // If the item has a special price, compute the total price as a combination of special price and regular price
        const specialPriceQuantity = pricingRule.specialPrice.quantity;
        const specialPrice = pricingRule.specialPrice.price;
        const regularPrice = pricingRule.unitPrice || 0;
        const specialPriceCount = Math.floor(quantity / specialPriceQuantity);
        const regularPriceCount = quantity % specialPriceQuantity;
        price = (specialPriceCount * specialPrice) + (regularPriceCount * regularPrice);
      }
  
      return price;
    }
  }


  
  
  // Example usage of the Checkout class
  const pricingRules = {
    A: {
      unitPrice: 50,
      specialPrice: { quantity: 3, price: 130 },
    },
    B: {
      unitPrice: 30,
      specialPrice: { quantity: 2, price: 45 },
    },
    C: { unitPrice: 20 },
    D: { unitPrice: 15 },
  };
  
  const checkout = new Checkout(pricingRules);
  
  checkout.scan("A");
  console.log(`Running total: ${checkout.calculateTotal()}`); 
  checkout.scan("B");
  console.log(`Running total: ${checkout.calculateTotal()}`); 
  checkout.scan("A");
  console.log(`Running total: ${checkout.calculateTotal()}`);
  checkout.scan("A");
  console.log(`Running total: ${checkout.calculateTotal()}`);
  checkout.scan("B");
  console.log(`Running total: ${checkout.calculateTotal()}`); 
  checkout.scan("C");
  console.log(`Running total: ${checkout.calculateTotal()}`); 
  checkout.scan("D");
  console.log(`Running total: ${checkout.calculateTotal()}`);
  