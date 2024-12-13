const { MongoClient } =require("mongodb");
const uri = "mongodb://localhost:27017/Bookstore";

async function checkBookField() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("yourDatabaseName");
    const ordersCollection = database.collection("orders");

    const result = await ordersCollection.find({ book: { $exists: true, $ne: null } }).toArray();
    console.log(result);
  } finally {
    await client.close();
  }
}

checkBookField().catch(console.error);
