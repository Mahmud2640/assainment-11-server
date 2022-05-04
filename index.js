const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = 5000;

// user name : warehousedb
// password : FOYVDvKFx6hBmJ4S

// mongoDB connection
const uri =
  "mongodb+srv://warehousedb:FOYVDvKFx6hBmJ4S@cluster0.zwh4y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  console.log("connected to mongoDB");
});

// root path API
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

// server port start
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
