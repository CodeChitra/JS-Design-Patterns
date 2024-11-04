class PaymentStrategy {
  pay(amount) {}
}

class CreditCardPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Processing credit card payment of ${amount}`);
    // Credit card payment logic
  }
}

class PayPalPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Processing PayPal payment of ${amount}`);
    // PayPal payment logic
  }
}

class BankTransferPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Processing bank transfer payment of ${amount}`);
    // Bank transfer payment logic
  }
}

class PaymentProcessor {
  constructor() {
    this.strategy = null;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  processPayment(amount) {
    this.strategy.pay(amount);
  }
}

const paymentProcessor = new PaymentProcessor();
paymentProcessor.setStrategy(new CreditCardPayment());
paymentProcessor.processPayment(100);

paymentProcessor.setStrategy(new PayPalPayment());
paymentProcessor.processPayment(50);
