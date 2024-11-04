# Factory Pattern (Creational)

The **Factory Design Pattern** is a **creational design pattern** that provides a way to create objects without specifying the exact class of object that will be created. Instead of using `new` to instantiate objects directly, the Factory pattern uses a factory method to create and return the objects. This pattern promotes loose coupling by isolating the instantiation of objects from the client code.

### Why Use the Factory Pattern?

1. **Encapsulation of Object Creation**: If object creation is complex or varies based on input conditions, the Factory pattern can encapsulate this complexity in one place.
2. **Improves Maintainability**: The client code doesn’t need to know about specific classes, so changes to object creation logic don't affect the client code.
3. **Supports Open-Closed Principle**: You can add new types of objects without modifying the client code, as long as they adhere to a common interface or superclass.
4. **Increases Flexibility**: With the factory pattern, you can return different classes based on input parameters or configurations.

---

### Real-Life Example: Pizza Store

Imagine we have a pizza store where customers can order different types of pizzas (e.g., **CheesePizza**, **PepperoniPizza**, and **VeggiePizza**). Each pizza requires different ingredients and preparation steps. Here, the **Factory Pattern** can help simplify the process by creating a **Pizza Factory** that handles pizza creation based on customer orders.

#### Without Factory Pattern:

The client code has to create pizzas like this:

```javascript
const cheesePizza = new CheesePizza();
const pepperoniPizza = new PepperoniPizza();
```

This approach requires the client to know the specific classes for each pizza type.

#### With Factory Pattern:

We create a `PizzaFactory` class with a `createPizza` method. This method accepts the type of pizza as an argument and returns the appropriate pizza object.

```javascript
// Pizza Interface
class Pizza {
  prepare() {}
  bake() {}
  cut() {}
  box() {}
}

// Concrete Pizza Classes
class CheesePizza extends Pizza {}
class PepperoniPizza extends Pizza {}
class VeggiePizza extends Pizza {}

// Factory
class PizzaFactory {
  static createPizza(type) {
    switch (type) {
      case "cheese":
        return new CheesePizza();
      case "pepperoni":
        return new PepperoniPizza();
      case "veggie":
        return new VeggiePizza();
      default:
        throw new Error("Unknown pizza type");
    }
  }
}

// Client Code
const pizzaType = "cheese";
const pizza = PizzaFactory.createPizza(pizzaType);
pizza.prepare();
pizza.bake();
pizza.cut();
pizza.box();
```

Now, the client code doesn’t need to know about the specific pizza classes. It simply asks the factory to create the right pizza type.

### Key Points to Note

- **Factory pattern** encapsulates object creation and returns objects based on input or configuration.
- It’s commonly used in **situations where object creation is complex** or varies based on context.
- **Use cases**: Pizza stores, vehicle manufacturing systems (creating cars, trucks, bikes), user registration (creating `AdminUser`, `StandardUser` based on user type), etc.

---

This pattern helps simplify client code, making it more flexible, maintainable, and adhering to solid principles.
NOTE: the client is any part of the code that needs an object and depends on the factory to provide it, freeing itself from the details of how the object is constructed.

# Singleton Pattern

The **Singleton Design Pattern** is a **creational design pattern** that ensures a class has only one instance and provides a global point of access to that instance. This pattern is useful when exactly one object is needed to coordinate actions across a system.

### Why Use the Singleton Pattern?

1. **Single Point of Access**: With a singleton, there’s only one instance, so it can be accessed globally, often used for managing shared resources.
2. **Controlled Resource Usage**: Ensures that only one object manages resources or data, preventing conflicts and optimizing resource usage.
3. **Lazy Initialization**: Often implemented with lazy initialization (only creating the instance when needed), which can improve performance if the instance is resource-heavy.

---

### Real-Life Example: Database Connection

Imagine an application that requires a database connection to perform operations. Instead of creating multiple connections each time the database is accessed, which would be inefficient and costly, we can use a singleton pattern to ensure only one connection instance is created and shared across the entire application.

#### Without Singleton Pattern:

Every time we need a connection, a new instance of the `DatabaseConnection` class would be created. This can lead to multiple open connections and inefficient resource use.

#### With Singleton Pattern:

We create a `DatabaseConnection` class that checks if an instance already exists. If it does, it returns that instance; if not, it creates one and then returns it.

```javascript
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance; // Return existing instance
    }
    // Simulate database connection setup
    this.connection = this.connectToDatabase();
    DatabaseConnection.instance = this; // Cache the instance
  }

  connectToDatabase() {
    // Simulate a costly operation of setting up a database connection
    console.log("Setting up a new database connection...");
    return {};
  }

  query(sql) {
    console.log(`Executing query: ${sql}`);
    // Imagine executing an SQL query
  }
}

// Client Code
const db1 = new DatabaseConnection();
db1.query("SELECT * FROM users");

const db2 = new DatabaseConnection();
db2.query("SELECT * FROM products");

console.log(db1 === db2); // true, since both are the same instance
```

#### Explanation:

1. **First Call**: `new DatabaseConnection()` creates a new instance and sets up the database connection.
2. **Subsequent Calls**: `new DatabaseConnection()` returns the already existing instance, avoiding the overhead of creating a new connection.

### Key Points to Note

- **Singleton pattern** ensures only one instance exists for the duration of the application.
- **Common Use Cases**: Database connections, logging services, configuration managers, thread pools, and shared resources.
- **Global Access**: By providing a single point of access, the singleton ensures easy availability of the instance.

---

### Pros and Cons

#### Pros

- Reduces unnecessary object creation, saving memory and processing time.
- Offers a centralized, controlled access point.

#### Cons

- Can introduce a **global state** to the application, making testing and maintenance harder if overused.
- **Not suitable** if multiple instances are genuinely needed (e.g., for multi-tenant databases).

---

### Recap

The Singleton pattern is especially useful for managing shared resources where only one instance should exist. In this example, the singleton provides a single database connection that can be accessed anywhere in the application, preventing resource waste and connection conflicts. Let me know if you’d like to explore another design pattern!

# Strategy Pattern

The **Strategy Design Pattern** is a **behavioral design pattern** that enables selecting an algorithm or behavior at runtime. It defines a family of algorithms, encapsulates each one, and makes them interchangeable. The Strategy pattern lets the algorithm vary independently from clients that use it, promoting flexibility and reducing conditional logic in the client code.

### Why Use the Strategy Pattern?

1. **Eliminate Conditional Statements**: Reduces complex if-else or switch-case statements by using encapsulated strategies for each behavior.
2. **Promote Code Reusability and Flexibility**: Enables adding new behaviors without modifying existing code, adhering to the Open-Closed Principle.
3. **Runtime Selection**: Allows algorithms to be chosen at runtime, making it easy to switch strategies based on context or input.

---

### Real-Life Example: Payment Processing

Consider an e-commerce application where customers can choose different payment methods, such as **Credit Card**, **PayPal**, or **Bank Transfer**. Each payment method has a different processing logic. Using the Strategy pattern, we can encapsulate each payment method as a separate strategy, making it easy to add or change payment methods without affecting the client code.

#### Without Strategy Pattern:

The client code would have to handle each payment method with conditional statements, which can become hard to manage and extend as more methods are added.

```javascript
if (paymentType === "creditCard") {
  // Process credit card payment
} else if (paymentType === "paypal") {
  // Process PayPal payment
} else if (paymentType === "bankTransfer") {
  // Process bank transfer
}
```

#### With Strategy Pattern:

Each payment method is encapsulated in a separate class, and a `PaymentProcessor` class is used to select the appropriate payment strategy dynamically.

```javascript
// Payment Strategy Interface
class PaymentStrategy {
  pay(amount) {}
}

// Concrete Payment Strategies
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

// Payment Processor (Context)
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy; // Sets the selected payment strategy
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  processPayment(amount) {
    this.strategy.pay(amount); // Executes the selected strategy
  }
}

// Client Code
const paymentProcessor = new PaymentProcessor(new CreditCardPayment());
paymentProcessor.processPayment(100); // Processes payment via Credit Card

paymentProcessor.setStrategy(new PayPalPayment());
paymentProcessor.processPayment(150); // Switches to PayPal

paymentProcessor.setStrategy(new BankTransferPayment());
paymentProcessor.processPayment(200); // Switches to Bank Transfer
```

#### Explanation:

1. **Strategy Interface (`PaymentStrategy`)**: Defines a method `pay()` that each payment strategy must implement.
2. **Concrete Strategies (`CreditCardPayment`, `PayPalPayment`, `BankTransferPayment`)**: Each strategy class implements the `pay()` method with its specific logic.
3. **Context (`PaymentProcessor`)**: Holds a reference to the current strategy and uses it to process payments. The `setStrategy()` method allows switching the strategy at runtime.

### Key Points to Note

- **Strategy pattern** enables interchangeable algorithms, allowing the client to switch behaviors dynamically.
- **Common Use Cases**: Payment processing, sorting algorithms, data compression algorithms, routing and pathfinding algorithms, and promotion calculation.
- **Reduces conditional complexity** by encapsulating each strategy into a separate class.

---

### Pros and Cons

#### Pros

- **Improves code flexibility and readability** by removing conditional logic.
- **Adheres to the Open-Closed Principle** since new strategies can be added without modifying existing code.

#### Cons

- **Increased number of classes** since each strategy requires its own class.
- **Communication overhead** if strategies need to share a lot of data with the context.

---

### Recap

The Strategy pattern is perfect for situations where you have multiple, interchangeable ways of doing something and want to decide on the behavior dynamically at runtime. In this example, we made payment methods (strategies) easily replaceable, allowing the client code to focus on processing the payment without dealing with the specifics of each method.

# Iterator Pattern

The **Iterator Design Pattern** is a **behavioral design pattern** that provides a way to access elements of a collection (such as a list or array) sequentially without exposing the underlying structure. It decouples the traversal logic from the collection itself, allowing different traversal methods without modifying the collection’s implementation.

### Why Use the Iterator Pattern?

1. **Simplifies Collection Traversal**: Provides a standard way to traverse a collection, avoiding the need to manage indexing or collection structure directly.
2. **Encapsulates Iteration Logic**: Keeps iteration details separate, allowing the collection to change internally without affecting traversal logic.
3. **Supports Different Traversal Approaches**: Enables multiple ways to traverse a collection, like forward, backward, or based on specific conditions.

---

### Real-Life Example: Browsing a Music Playlist

Imagine a music application with a playlist where you want to be able to **play songs one by one**, either in **forward** or **backward** order, without directly accessing the playlist's internal array. Using the Iterator pattern, we can create an iterator to control the traversal, so the client only interacts with the iterator instead of the playlist itself.

#### Without Iterator Pattern:

The client would have to handle indexing and access elements directly, managing internal details and any changes to the playlist structure.

```javascript
// Accessing elements directly
const playlist = ["Song A", "Song B", "Song C"];
for (let i = 0; i < playlist.length; i++) {
  console.log(`Playing: ${playlist[i]}`);
}
```

#### With Iterator Pattern:

We create a `PlaylistIterator` class to handle the traversal, providing methods to access elements in the desired sequence. The client can then use this iterator without directly interacting with the playlist.

```javascript
// Playlist Collection
class Playlist {
  constructor() {
    this.songs = [];
  }

  addSong(song) {
    this.songs.push(song);
  }

  getIterator() {
    return new PlaylistIterator(this);
  }
}

// Playlist Iterator
class PlaylistIterator {
  constructor(playlist) {
    this.playlist = playlist;
    this.currentIndex = 0;
  }

  hasNext() {
    return this.currentIndex < this.playlist.songs.length;
  }

  next() {
    if (this.hasNext()) {
      return this.playlist.songs[this.currentIndex++];
    }
    return null;
  }

  hasPrevious() {
    return this.currentIndex > 0;
  }

  previous() {
    if (this.hasPrevious()) {
      return this.playlist.songs[--this.currentIndex];
    }
    return null;
  }
}

// Client Code
const playlist = new Playlist();
playlist.addSong("Song A");
playlist.addSong("Song B");
playlist.addSong("Song C");

const iterator = playlist.getIterator();

console.log("Forward Iteration:");
while (iterator.hasNext()) {
  console.log(`Playing: ${iterator.next()}`);
}

console.log("Backward Iteration:");
while (iterator.hasPrevious()) {
  console.log(`Playing: ${iterator.previous()}`);
}
```

#### Explanation:

1. **Playlist (Collection)**: A collection of songs, which exposes a `getIterator()` method that returns an iterator.
2. **PlaylistIterator**: Implements traversal methods like `next()` and `previous()`, along with `hasNext()` and `hasPrevious()` to check if elements are available in that direction.
3. **Client Code**: Uses the iterator to navigate the playlist, without knowing about the playlist’s internal structure.

### Key Points to Note

- **Iterator pattern** allows decoupling traversal logic from the collection.
- **Common Use Cases**: Iterating through collections, like lists, arrays, trees, or complex data structures, without revealing their structure.
- **Custom Traversal**: Iterators can implement different traversal mechanisms, like random, forward, backward, or conditional.

---

### Pros and Cons

#### Pros

- **Standardizes collection traversal** without exposing internal structure.
- **Supports multiple traversal strategies** and can be customized to provide unique traversal patterns.

#### Cons

- **Additional overhead** of creating iterator objects.
- **Not always efficient** for simple collections where direct access is more optimal.

---

### Recap

The Iterator pattern is particularly useful for situations where you want to provide different ways to access elements in a collection, or if you want to keep traversal logic separate from the collection itself. In our example, it enables the client to navigate the playlist forward and backward, without accessing or manipulating the underlying array directly.

# Observer Pattern

The **Observer Design Pattern** is a **behavioral design pattern** where an object, known as the **subject**, maintains a list of dependents, called **observers**, and notifies them automatically of any state changes, usually by calling one of their methods. This pattern is often used to implement distributed event-handling systems.

### Why Use the Observer Pattern?

1. **Decouples Subject and Observers**: The subject does not need to know the specifics of the observers. It only knows they want updates, promoting loose coupling.
2. **One-to-Many Dependency**: When one object changes state, all its dependents are notified and updated automatically.
3. **Dynamic Subscription**: Observers can be added or removed at runtime, providing flexibility in managing who receives updates.

---

### Real-Life Example: YouTube Channel Subscriptions

Imagine a YouTube channel that has subscribers. Whenever the channel owner uploads a new video, all subscribers should be notified. Here, the YouTube channel is the **subject**, and the subscribers are the **observers**.

#### Without Observer Pattern:

The channel would have to keep track of all subscribers manually and notify each one, which can lead to tightly coupled code that's difficult to manage or extend.

```javascript
// Without Observer pattern, the channel would notify each subscriber directly
const subscribers = ["User1", "User2", "User3"];
subscribers.forEach((subscriber) => {
  console.log(`Notifying ${subscriber} about new video`);
});
```

#### With Observer Pattern:

We can encapsulate the notification logic in an observer pattern, allowing subscribers to "subscribe" to or "unsubscribe" from the channel dynamically.

```javascript
// Observer Interface
class Subscriber {
  update(channelName, videoTitle) {
    console.log(
      `Notification to ${this.name}: ${channelName} uploaded a new video: ${videoTitle}`
    );
  }
}

// Concrete Subscriber (Observer)
class YouTubeSubscriber extends Subscriber {
  constructor(name) {
    super();
    this.name = name;
  }
}

// Subject (YouTube Channel)
class YouTubeChannel {
  constructor(channelName) {
    this.channelName = channelName;
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
    console.log(`${subscriber.name} has subscribed to ${this.channelName}`);
  }

  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
    console.log(`${subscriber.name} has unsubscribed from ${this.channelName}`);
  }

  notifySubscriber(videoTitle) {
    this.subscribers.forEach((subscriber) => {
      subscriber.update(this.channelName, videoTitle); // Notifies each subscriber
    });
  }

  uploadVideo(videoTitle) {
    console.log(`${this.channelName} uploaded: ${videoTitle}`);
    this.notifySubscriber(videoTitle); // Notify all subscribers about the new video
  }
}

// Client Code
const channel = new YouTubeChannel("TechWorld");
const user1 = new YouTubeSubscriber("User1");
const user2 = new YouTubeSubscriber("User2");

channel.subscribe(user1);
channel.subscribe(user2);

channel.uploadVideo("Observer Pattern Explained"); // Notify all subscribers

channel.unsubscribe(user1);

channel.uploadVideo("Strategy Pattern in Depth"); // Notify remaining subscribers
```

#### Explanation:

1. **YouTube Channel (Subject)**: Maintains a list of subscribers and notifies them when a new video is uploaded.
2. **Subscriber (Observer)**: Implements an `update` method that receives notifications from the subject.
3. **YouTubeSubscriber (Concrete Observer)**: Implements the specific behavior for subscribers, which is to display a notification when a new video is uploaded.
4. **Client Code**: Uses the subject and observer classes to manage subscriptions and notifications.

### Key Points to Note

- **Observer pattern** defines a one-to-many relationship between a subject and its observers.
- **Common Use Cases**: Implementing event systems, where objects need to react to state changes, like UI updates in MVC, data streams, and messaging systems.
- **Dynamic Subscription**: Observers can join or leave the subscription list at runtime.

---

### Pros and Cons

#### Pros

- **Loose Coupling**: The subject only knows the observers exist but doesn’t need to know their details.
- **Scalability**: Allows multiple observers to react to changes without modifying the subject, making it easy to add or remove observers.

#### Cons

- **Potential Memory Leaks**: Observers must remember to unsubscribe to avoid memory leaks if the subject continues holding references to them.
- **Complex Debugging**: If many observers are involved, debugging and understanding the flow of updates can become challenging.

---

### Recap

The Observer pattern is an excellent solution for situations where you want to inform a group of objects (observers) about changes in the state of another object (subject) without tightly coupling them. In this example, the pattern makes it easy to notify YouTube subscribers about new video uploads without requiring the channel to directly manage each subscriber. Let me know if you’d like to discuss another pattern!

# Proxy Pattern

The **Proxy Design Pattern** is a **structural design pattern** that provides a surrogate or placeholder for another object to control access to it. It’s commonly used to add a level of control or functionality, such as **lazy initialization**, **access control**, **logging**, or **caching**, without changing the original object.

### Why Use the Proxy Pattern?

1. **Controls Access**: Limits or mediates access to the main object, often adding security or control mechanisms.
2. **Adds Extra Functionality**: Enhances functionality like caching, logging, or lazy loading, reducing the load on the original object.
3. **Protects Resource-Intensive Objects**: Creates a lightweight proxy in place of a heavy or remote object, loading it only when necessary.

---

### Real-Life Example: Internet Access via a Proxy Server

Imagine a company network where all employees access the internet through a **proxy server**. This proxy server **controls access** (like blocking certain sites) and **logs activity** for security and monitoring. Here, the **proxy** acts as a go-between, ensuring that employees only access approved sites while the main server handles the internet connection.

#### Without Proxy Pattern:

Without a proxy, each employee would access the internet directly, which could lead to unmonitored and potentially unsafe browsing activity.

```javascript
// Without Proxy, employees access the internet directly
class InternetAccess {
  connectTo(site) {
    console.log(`Connecting to ${site}`);
  }
}

const internet = new InternetAccess();
internet.connectTo("allowedSite.com"); // Connects directly
internet.connectTo("restrictedSite.com"); // Connects directly
```

#### With Proxy Pattern:

With the proxy, employees access the internet through a `ProxyInternetAccess` class, which checks if the site is allowed before connecting.

```javascript
// Real Internet Access class
class InternetAccess {
  connectTo(site) {
    console.log(`Connecting to ${site}`);
  }
}

// Proxy for Internet Access
class ProxyInternetAccess {
  constructor() {
    this.internet = new InternetAccess();
    this.blockedSites = ["restrictedSite.com", "blockedSite.com"];
  }

  connectTo(site) {
    if (this.blockedSites.includes(site)) {
      console.log(`Access to ${site} is blocked`);
    } else {
      this.internet.connectTo(site); // Forward request to real internet access
    }
  }
}

// Client Code
const proxyInternet = new ProxyInternetAccess();
proxyInternet.connectTo("allowedSite.com"); // Allowed, connects to the internet
proxyInternet.connectTo("restrictedSite.com"); // Blocked, access denied
```

#### Explanation:

1. **InternetAccess (Real Object)**: Represents the actual internet connection, which allows direct access to any site.
2. **ProxyInternetAccess (Proxy)**: Controls access by allowing only certain sites and denying access to blocked sites.
3. **Client Code**: Uses the proxy to attempt to connect to various sites without knowing the proxy’s internal logic.

### Key Points to Note

- **Proxy pattern** provides controlled access to another object, adding extra functionality.
- **Common Use Cases**: Security checks, caching, lazy loading, and managing remote objects.
- **Types of Proxies**:
  - **Protection Proxy**: Controls access based on permissions.
  - **Virtual Proxy**: Delays object creation until it’s needed (lazy loading).
  - **Remote Proxy**: Manages interactions with a remote object.
  - **Logging Proxy**: Logs requests made to the real object.

---

### Pros and Cons

#### Pros

- **Enhanced Control**: Manages access, security, and functionality without modifying the real object.
- **Resource Optimization**: Supports lazy loading, reducing memory and performance costs.

#### Cons

- **Increased Complexity**: Adds another layer to the code, which can complicate maintenance and debugging.
- **Performance Impact**: May introduce slight delays due to proxy operations, depending on complexity.

---

### Recap

The Proxy pattern is ideal when you need a level of control over an object’s access or behavior. In the example, the proxy restricts certain sites, controlling internet usage and improving security. This way, the main internet access functionality remains untouched, and access rules are managed separately in the proxy.

# Mediator Pattern

The **Mediator Design Pattern** is a **behavioral design pattern** that allows multiple objects to communicate with each other without requiring them to be aware of each other's implementation. Instead of objects communicating directly, they send messages through a central **mediator** object, which coordinates and manages their interactions.

### Why Use the Mediator Pattern?

1. **Reduces Complex Dependencies**: By centralizing communication, the Mediator pattern reduces the need for objects to hold references to each other, making the system easier to manage and extend.
2. **Promotes Loose Coupling**: Objects interact through the mediator rather than directly, which decouples them and enhances flexibility.
3. **Improves Code Organization**: The Mediator organizes communication and helps avoid tangled webs of interactions in large systems.

---

### Real-Life Example: Air Traffic Control

In an airport, aircraft cannot communicate with each other directly. Instead, they coordinate through **air traffic control (ATC)**, which serves as a **mediator** to manage the movements of all planes and prevent collisions. ATC directs each aircraft, allowing it to land, take off, or taxi, without planes needing to know each other’s status or intentions.

#### Without Mediator Pattern:

Without a mediator, each plane would have to know about all other planes to coordinate takeoffs and landings, leading to chaotic and tightly coupled communication.

```javascript
// Without Mediator, planes would communicate with each other directly
class Plane {
  requestLanding() {
    console.log("Plane requesting permission to land");
  }

  grantLandingPermission() {
    console.log("Permission granted to land");
  }
}

const plane1 = new Plane();
const plane2 = new Plane();

plane1.requestLanding();
plane2.grantLandingPermission(); // Each plane needs to know about others
```

#### With Mediator Pattern:

With the mediator, planes interact only with ATC, which manages landing, takeoff, and taxiing to ensure smooth operation without direct plane-to-plane interaction.

```javascript
// Mediator (Air Traffic Control)
class AirTrafficControl {
  constructor() {
    this.planes = [];
  }

  registerPlane(plane) {
    this.planes.push(plane);
  }

  requestLanding(plane) {
    console.log(`ATC: ${plane.name} requesting landing`);
    // ATC grants permission based on its conditions
    console.log(`ATC: Permission granted to ${plane.name} to land`);
  }
}

// Plane (Colleague)
class Plane {
  constructor(name, atc) {
    this.name = name;
    this.atc = atc;
    this.atc.registerPlane(this);
  }

  land() {
    console.log(`${this.name} preparing to land`);
    this.atc.requestLanding(this); // Requests landing through ATC
  }
}

// Client Code
const atc = new AirTrafficControl();
const plane1 = new Plane("Flight 101", atc);
const plane2 = new Plane("Flight 202", atc);

plane1.land(); // Request handled through ATC
plane2.land(); // Request handled through ATC
```

#### Explanation:

1. **AirTrafficControl (Mediator)**: Manages communication between planes, ensuring that requests for landing or takeoff are handled safely.
2. **Plane (Colleague)**: Represents each plane, which interacts only with the ATC (mediator) and does not need to directly communicate with other planes.
3. **Client Code**: Creates instances of `Plane` and assigns them to ATC, which then coordinates landing requests.

### Key Points to Note

- **Mediator pattern** centralizes interactions, making each object interact only with the mediator instead of with each other.
- **Common Use Cases**: Systems with many interdependent objects, like chat applications, multiplayer games, and form validation.
- **Improves Code Organization**: By consolidating communication, the mediator makes it easy to manage changes in one place rather than adjusting every interaction point.

---

### Pros and Cons

#### Pros

- **Loose Coupling**: Objects no longer need to know about each other, which enhances modularity.
- **Centralized Control**: The mediator provides a single point for managing complex interactions.

#### Cons

- **Potential Bottleneck**: If too much logic is centralized in the mediator, it can become complex and difficult to maintain.
- **Reduced Flexibility**: Changes in the mediator can affect all objects that interact through it.

---

### Recap

The Mediator pattern is ideal for situations where multiple objects need to coordinate without directly referring to each other. In the example, the ATC acts as a mediator, allowing planes to communicate indirectly, which keeps the system organized and avoids chaotic, tangled connections. This pattern is common in systems where centralized control or coordination is necessary.

# Visitor Pattern

The **Visitor Design Pattern** is a **behavioral design pattern** that lets you add further operations to objects without modifying their classes. By separating an algorithm from the objects it operates on, the Visitor pattern allows you to define new operations on existing object structures without changing the objects themselves.

### Why Use the Visitor Pattern?

1. **Separates Operations from Objects**: Encapsulates operations within visitors instead of spreading them across multiple object classes, which makes it easy to add new functionality without modifying existing code.
2. **Open-Closed Principle**: Allows classes to be open for extension but closed for modification. New behaviors can be added by creating a new visitor.
3. **Simplifies Maintenance**: Consolidates similar operations into visitor classes, which keeps each operation in one place.

---

### Real-Life Example: Tax Calculation for Different Products

Imagine an online store with multiple product types (e.g., electronics, food, clothing), each having a different tax calculation method. Instead of putting tax logic in each product class, a `TaxVisitor` can handle all tax calculations, allowing you to add or change tax rules without altering the product classes.

#### Without Visitor Pattern:

Without the Visitor pattern, each product class would have to implement its own tax logic, making it harder to maintain and extend as tax rules change.

```javascript
// Without Visitor, each product must handle its own tax calculation
class Electronics {
  calculateTax() {
    console.log("Calculating tax for electronics...");
    return 10; // Example tax calculation
  }
}

class Food {
  calculateTax() {
    console.log("Calculating tax for food...");
    return 5;
  }
}

const electronicItem = new Electronics();
const foodItem = new Food();

console.log(electronicItem.calculateTax());
console.log(foodItem.calculateTax());
```

#### With Visitor Pattern:

With the Visitor pattern, we move the tax calculation to a `TaxVisitor` class that knows how to calculate tax for different product types, allowing the products to remain unchanged if tax rules are updated.

```javascript
// Visitor Interface
class Visitor {
  visitElectronics(electronics) {}
  visitFood(food) {}
}

// Concrete Visitor (TaxVisitor)
class TaxVisitor {
  visitElectronics(electronics) {
    console.log(`Calculating tax for ${electronics.name}`);
    return electronics.price * 0.15; // Example tax rate for electronics
  }

  visitFood(food) {
    console.log(`Calculating tax for ${food.name}`);
    return food.price * 0.05; // Example tax rate for food
  }
}

// Product Interface (Element)
class Product {
  accept(visitor) {}
}

// Concrete Elements (Products)
class Electronics extends Product {
  constructor(name, price) {
    super();
    this.name = name;
    this.price = price;
  }

  accept(visitor) {
    return visitor.visitElectronics(this); // Passes itself to the visitor
  }
}

class Food extends Product {
  constructor(name, price) {
    super();
    this.name = name;
    this.price = price;
  }

  accept(visitor) {
    return visitor.visitFood(this); // Passes itself to the visitor
  }
}

// Client Code
const taxVisitor = new TaxVisitor();

const electronicItem = new Electronics("Laptop", 1000);
const foodItem = new Food("Bread", 10);

console.log(
  `Tax for ${electronicItem.name}: $${electronicItem.accept(taxVisitor)}`
);
console.log(`Tax for ${foodItem.name}: $${foodItem.accept(taxVisitor)}`);
```

#### Explanation:

1. **Visitor (TaxVisitor)**: Implements the `visitElectronics` and `visitFood` methods to calculate tax based on the product type.
2. **Elements (Electronics and Food)**: Implement the `accept` method, which calls the appropriate visitor method.
3. **Client Code**: Calls the `accept` method on products, passing the `TaxVisitor` to perform the tax calculation.

### Key Points to Note

- **Visitor pattern** allows you to define operations on object structures without modifying the classes.
- **Common Use Cases**: Situations where you have many objects with different behaviors, and you want to apply the same operation across them, like serialization, validation, or calculations.
- **Separates Responsibility**: The visitor handles operations, while the product classes focus on their core data.

---

### Pros and Cons

#### Pros

- **Open for Extension**: New operations can be added by defining a new visitor.
- **Single Responsibility Principle**: Separates algorithms from the objects they operate on.

#### Cons

- **Requires Modifying Existing Classes**: Each class needs an `accept` method, which can be challenging if you don’t control these classes.
- **Less Suitable for Changing Structures**: If the object structure frequently changes, updating all visitors can become difficult.

---

### Recap

The Visitor pattern is useful for adding operations to a set of objects without modifying their classes. In the example, the `TaxVisitor` calculates taxes for different product types without modifying the product classes themselves. This keeps the tax calculation logic in a single place and allows you to easily add new operations if needed.

# Retry Pattern

The **Retry Pattern** is a **resilience pattern** used to handle transient failures, such as network issues or temporary unavailability of a service. When an operation fails, the Retry pattern allows you to attempt it multiple times before giving up, helping improve reliability in systems where intermittent failures are common.

### Why Use the Retry Pattern?

1. **Increases Reliability**: Helps your system gracefully handle temporary failures without immediately failing, increasing robustness.
2. **Automatic Recovery**: Allows you to automate retry attempts, which can prevent errors that may resolve on their own (e.g., due to network hiccups).
3. **Configurable Retry Logic**: You can define how many times to retry, delay between retries, and what exceptions to handle, making it flexible for different scenarios.

---

### Real-Life Example: API Call with Temporary Network Failures

Imagine a mobile app that makes API calls to a remote server to fetch data. Sometimes, the server might be temporarily unavailable, or network issues may prevent the app from receiving a response. Instead of immediately failing, the app can retry the API call a few times before notifying the user of an error.

#### Without Retry Pattern:

Without the Retry pattern, the API call would fail immediately if there’s a transient network issue, potentially leading to a poor user experience.

```javascript
// Without Retry: A single API call attempt
function fetchData() {
  return fetch("https://api.example.com/data")
    .then((response) => response.json())
    .catch((error) => console.error("Failed to fetch data:", error));
}

fetchData(); // Fails immediately if network issue occurs
```

#### With Retry Pattern:

With the Retry pattern, we can wrap the API call in a retry mechanism that automatically retries a set number of times with a delay in between each attempt.

```javascript
// Retry logic with configurable attempts and delay
function retryOperation(operation, delay, retries) {
  return new Promise((resolve, reject) => {
    function attempt() {
      operation()
        .then(resolve) // Resolves if operation is successful
        .catch((error) => {
          if (retries === 0) {
            reject(error); // Rejects after all retries are exhausted
          } else {
            retries--;
            console.log(`Retrying... Attempts left: ${retries}`);
            setTimeout(attempt, delay); // Retries after delay
          }
        });
    }
    attempt();
  });
}

// API call wrapped in retry logic
function fetchData() {
  return fetch("https://api.example.com/data").then((response) =>
    response.json()
  );
}

// Client Code
retryOperation(fetchData, 1000, 3) // Retries up to 3 times with 1 second delay
  .then((data) => console.log("Data fetched:", data))
  .catch((error) =>
    console.error("Failed to fetch data after retries:", error)
  );
```

#### Explanation:

1. **Retry Operation**: A helper function (`retryOperation`) that takes an operation (like `fetchData`), a delay between retries, and a number of retry attempts.
2. **Wrapped API Call**: The `fetchData` function is passed to `retryOperation`, which will retry it up to 3 times if it fails, waiting 1 second between attempts.
3. **Client Code**: Calls `retryOperation` to handle any transient failures without needing complex error handling in the `fetchData` function itself.

---

### Key Points to Note

- **Retry Pattern** is especially useful for handling temporary issues, like network timeouts or service rate limits.
- **Configurable Logic**: Allows you to define retry count, delay, and error-handling strategies based on your needs.
- **Limits**: It’s important to define limits on retries to prevent indefinite looping, which could overload the system.

---

### Pros and Cons

#### Pros

- **Improves Resilience**: Handles temporary failures without immediate errors, resulting in a more reliable system.
- **Customizable Retry Logic**: Retry intervals, count, and back-off strategies can be adjusted.

#### Cons

- **Increased Latency**: Retries introduce delays, which can impact response times if not managed carefully.
- **Potential Overload**: If multiple operations continuously retry, they could overload the system or service.

---

### Recap

The Retry pattern is a valuable tool for creating resilient systems that can recover from intermittent issues. In the example, the `fetchData` function uses `retryOperation` to handle network issues by retrying the API call several times before failing. This improves reliability and user experience by preventing immediate errors for transient issues.

# Builder Pattern

The **Builder Design Pattern** is a **creational design pattern** used to construct complex objects step-by-step. Unlike the Factory pattern, which creates an object in one step, the Builder pattern lets you create an object by defining various parameters or options, giving you fine control over the construction process.

### Why Use the Builder Pattern?

1. **Simplifies Object Creation**: Useful for objects with many optional parameters or complex configurations.
2. **Improves Code Readability**: Builder methods make it clear which parts of an object are being set, which is especially helpful when you have many optional fields.
3. **Immutable Objects**: Builder allows you to build immutable objects with complex configurations, ensuring the final object remains consistent and unmodifiable after creation.

---

### Real-Life Example: Building a Custom Pizza Order

Imagine an online pizza-ordering app where customers can customize their pizzas with different crusts, sizes, sauces, and toppings. Each customer might have different preferences, so the pizza object can be built step-by-step based on these preferences.

#### Without Builder Pattern:

Without the Builder pattern, creating a `Pizza` object with various optional parameters would require a large constructor or many setter methods, leading to unreadable or hard-to-maintain code.

```javascript
// Without Builder: Complex constructor with many parameters
class Pizza {
  constructor(size, crust, cheese, toppings) {
    this.size = size || "medium";
    this.crust = crust || "thin";
    this.cheese = cheese || false;
    this.toppings = toppings || [];
  }
}

const myPizza = new Pizza("large", "stuffed", true, ["pepperoni", "mushrooms"]);
console.log(myPizza);
```

In this example, if you wanted to change only one option (like adding or removing a topping), you'd need to modify the constructor every time, which can become cumbersome.

#### With Builder Pattern:

With the Builder pattern, you can build the `Pizza` object step-by-step, only setting the properties you want.

```javascript
// Builder class to create Pizza objects step-by-step
class PizzaBuilder {
  constructor() {
    this.size = "medium"; // default values
    this.crust = "thin"; // default values
    this.cheese = false; // default values
    this.toppings = []; // default values
  }

  setSize(size) {
    this.size = size;
    return this; // Allows method chaining
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

// The final Pizza class created by the builder
class Pizza {
  constructor(size, crust, cheese, toppings) {
    this.size = size;
    this.crust = crust;
    this.cheese = cheese;
    this.toppings = toppings;
  }
}

// Client code using the Builder
const myPizza = new PizzaBuilder()
  .setSize("large")
  .setCrust("stuffed")
  .addCheese()
  .addTopping("pepperoni")
  .addTopping("mushrooms")
  .build();

console.log(myPizza);
```

#### Explanation:

1. **PizzaBuilder**: Provides methods to set various pizza options (`setSize`, `setCrust`, `addCheese`, `addTopping`), each returning `this` to allow chaining.
2. **build() Method**: Finalizes the object creation by calling the `Pizza` constructor with the accumulated properties.
3. **Client Code**: Calls builder methods to specify pizza preferences, building the object only after all options are set.

---

### Key Points to Note

- **Builder pattern** is ideal for constructing complex objects that require multiple optional parameters or configurations.
- **Method Chaining**: The builder methods return `this`, which enables chaining, resulting in a more readable and fluid object construction process.
- **Immutable Object**: Once built, the `Pizza` object remains immutable (can’t be modified), ensuring consistency.

---

### Pros and Cons

#### Pros

- **Improves Readability**: The step-by-step process makes it clear which properties are set, making code more readable.
- **Reduces Constructor Overload**: Avoids constructors with numerous parameters, simplifying object creation.
- **Encapsulates Complex Construction**: All building logic is encapsulated within the builder, keeping it separate from the main class.

#### Cons

- **Increased Code**: Requires more classes (builder class alongside the actual class).
- **Not Always Necessary**: For simpler objects, the Builder pattern may add unnecessary complexity.

---

### Recap

The Builder pattern is a powerful way to create objects that require a complex setup, like a pizza order with multiple customization options. By using the builder, the code remains clear, readable, and flexible to future changes. The builder collects each setting, and once all options are specified, it constructs the object in a consistent state.
