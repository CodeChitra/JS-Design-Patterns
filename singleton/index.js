class DatabaseConnection {
  constructor() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = this;
      this.connection = this.connectToDatabase();
    }
    return DatabaseConnection.instance;
  }

  connectToDatabase() {
    console.log("Setting up a new database connection...");
    return {};
  }

  query(sql) {
    console.log(`Executing query: ${sql}`);
  }
}

// Client Code
const db1 = new DatabaseConnection();
db1.query("SELECT * FROM users");

const db2 = new DatabaseConnection();
db2.query("SELECT * FROM products");

console.log(db1 === db2);
