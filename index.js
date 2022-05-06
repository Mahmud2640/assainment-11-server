const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// user name : warehousedb
// password : FOYVDvKFx6hBmJ4S

// mongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zwh4y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function connect() {
  try {
    await client.connect();
    const productCollection = client.db("warehouse").collection("products");
    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const products = await productCollection.findOne(query);
      res.send(products);
    });

    // post
    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    });

    // // delete
    // app.delete("/product/:id", async (req, res) => {
    //   const id = req.params._id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await productCollection.deleteOne(query);
    //   res.send(result);
    // });
  } finally {
  }
}
connect().catch(console.dir);

// root path API
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

// server port start
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
