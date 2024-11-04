class Visitor {}

class TaxVisitor extends Visitor {
  visitElectronics(product) {
    return product.price * 0.05;
  }
  visitFood(product) {
    return product.price * 0.1;
  }
}
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  accept(visitor) {}
}

class Electronics extends Product {
  constructor(name, price) {
    super(name, price);
  }
  accept(visitor) {
    return visitor.visitElectronics(this);
  }
}

class Food extends Product {
  constructor(name, price) {
    super(name, price);
  }
  accept(visitor) {
    return visitor.visitFood(this);
  }
}

const taxVisitor = new TaxVisitor();

const electronicItem = new Electronics("Laptop", 1000);
const foodItem = new Food("Bread", 10);

console.log(
  `Tax for ${electronicItem.name}: $${electronicItem.accept(taxVisitor)}`
);
console.log(`Tax for ${foodItem.name}: $${foodItem.accept(taxVisitor)}`);
