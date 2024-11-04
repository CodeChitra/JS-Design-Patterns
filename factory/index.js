class Pizza {
  prepare() {}
  bake() {}
  cut() {}
  box() {}
}

class CheesePizza extends Pizza {}
class PepperoniPizza extends Pizza {}
class VeggiePizza extends Pizza {}

class PizzaFactory {
  createPizza(type) {
    switch (type) {
      case "cheese":
        return new CheesePizza();
      case "pepperoni":
        return new PepperoniPizza();
      case "veggie":
        return new VeggiePizza();
      default:
        throw new Error("Invalid pizza type");
    }
  }
}

//client code

const pizzaType = "cheese"; // this can be a user input
const pizza = PizzaFactory.createPizza(pizzaType);
pizza.prepare();
pizza.bake();
pizza.cut();
pizza.box();
