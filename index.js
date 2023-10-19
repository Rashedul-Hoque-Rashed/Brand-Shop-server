const express = require("express");
const cors = require("cors");
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x210mec.mongodb.net/?retryWrites=true&w=majority`;


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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const collections = client.db("productsDB").collection('products');
    const cartCollections = client.db("cartDB").collection('cart');
    const category = [
      {
        "id": 1,
        "brand_name": "Urban Decay",
        "brand_img": "https://i.ibb.co/475jYWw/urban-decay.png",
        "slider1": "https://i.ibb.co/NWzqpFx/luchiana-2509818535-1520x394.webp",
        "slider2": "https://i.ibb.co/593RFKy/luchiana-2517430051-1520x394.webp",
        "slider3": "https://i.ibb.co/wNfkdG4/luchiana-2517802173-1520x394.webp",
      },
      {
        "id": 2,
        "brand_name": "Revlon",
        "brand_img": "https://i.ibb.co/BKR8Hrh/Revlon-preview.png"
      },
      {
        "id": 3,
        "brand_name": "Avon",
        "brand_img": "https://i.ibb.co/nkyHXMJ/Avon-preview.png"
      },
      {
        "id": 4,
        "brand_name": "Coty",
        "brand_img": "https://i.ibb.co/Nn7wFB4/Coty.png"
      },
      {
        "id": 5,
        "brand_name": "Dior",
        "brand_img": "https://i.ibb.co/bQbJnDZ/Dior-preview.png"
      },
      {
        "id": 6,
        "brand_name": "Chanel",
        "brand_img": "https://i.ibb.co/BK8cMHh/Chanel.png"
      },
    ]

    app.get("/categories", (req, res) => {
      res.send(category);
    })



    app.get("/products", async (req, res) => {
      const courser = collections.find();
      const result = await courser.toArray();
      res.send(result);
    })

    app.get("/products/:brand_name", async (req, res) => {
      const brand_name = req.params.brand_name;
      const query = { brandName: brand_name };
      const courser = collections.find(query);
      const result = await courser.toArray();
      res.send(result);
    })

    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await collections.findOne(query);
      res.send(result);
    })

    app.get("/update/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await collections.findOne(query);
      res.send(result);
    })

    app.post("/products", async (req, res) => {
      const newProducts = req.body;
      const result = await collections.insertOne(newProducts);
      res.send(result);

    })

    app.put("update/:id", async (req, res) => {
      const id = req.params.id;
      const updateProduct = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const product = {
        $set: {
          name: updateProduct.name,
          brandName: updateProduct.brandName,
          type: updateProduct.type,
          description: updateProduct.description,
          price: updateProduct.price,
          rating: updateProduct.rating,
          photo: updateProduct.photo
        }
      }
      const result = await collections.updateOne(query, product, options);
      res.send(result);
    })

    app.get("/cart", async (req, res) => {
      const courser = cartCollections.find();
      const result = await courser.toArray();
      res.send(result);
    })

    app.post("/cart", async (req, res) => {
      const addCart = req.body;
      const result = await cartCollections.insertOne(addCart);
      res.send(result);

    })

    app.delete("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollections.deleteOne(query);
      res.send(result);
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




app.get("/", (req, res) => {
  res.send('Brand-Shop-server is running');
})


app.listen(port, () => {
  console.log(`Brand-Shop-server is running on PORT: ${port}`)
})

