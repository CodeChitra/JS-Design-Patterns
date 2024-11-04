class Pizza {
  constructor(size, crust, cheese, toppings) {
    this.size = size;
    this.crust = crust;
    this.cheese = cheese;
    this.toppings = toppings;
  }
}

class PizzaBuilder {
  constructor() {
    this.size = "medium"; // default values
    this.crust = "thin"; // default values
    this.cheese = false; // default values
    this.toppings = []; // default values
  }

  setSize(size) {
    this.size = size;
    return this;
  }

  setCrust(crust) {
    this.crust = crust;
    return this;
  }

  addCheese() {
    this.cheese = true;
    return this;
  }

  addTopping(topping) {
    this.toppings.push(topping);
    return this;
  }

  build() {
    return new Pizza(this.size, this.crust, this.cheese, this.toppings);
  }
}

const myPizza = new PizzaBuilder()
  .setSize("large")
  .setCrust("stuffed")
  .addCheese()
  .addTopping("pepperoni")
  .addTopping("mushrooms")
  .build();

console.log(myPizza);
