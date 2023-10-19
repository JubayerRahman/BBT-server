const express = require("express")
const cors  = require("cors")
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require("dotenv").config()

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w7xbhfw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const BBT = client.db("porductsDB").collection("products")
    const CartProduct = client.db("porductsDB").collection("cart")

    app.get('/products', async(req, res)=>{
        const products = BBT.find()
        const result = await products.toArray()
        res.send(result)
    })

    app.get ("/products/:id", async(req, res)=>{
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const result = await BBT.findOne(filter)
      res.send(result)
    })

    app.post('/products',async(req, res)=>{
        const product = req.body;
        const result = await BBT.insertOne(product)
        res.send(result)
    })

    // cart Datas

    app.get('/cart', async(req, res)=>{
      const products = CartProduct.find()
      const result = await products.toArray()
      res.send(result)
  })
    app.post('/cart',async(req, res)=>{
      const product = req.body;
      const result = await CartProduct.insertOne(product)
      res.send(result)
  })
  
  app.delete('/cart/:id', async(req, res)=>{
    const id = req.params.id
    const cursor = {_id: new ObjectId(id)}
    const result = await CartProduct.deleteOne(cursor)
    res.send(result)
  })
    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// starter
app.get("/",(req,res)=>{
    res.send("Server of Assignment 10")
})

app.listen(port,()=>{
    console.log(`Server of assignment 10 is running at ${port}`);
})