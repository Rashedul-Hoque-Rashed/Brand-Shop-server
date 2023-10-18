const express = require("express");
const cors = require("cors");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
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


    app.get("/categories", (req,res)=>{
      const category = [
        {
          "id": 1,
          "brand_name": "Urban Decay",
          "brand_img": "https://i.ibb.co/475jYWw/urban-decay.png"
        },
        {
          "id": 2,
          "brand_name": "Revlon",
          "brand_img": "https://i.ibb.co/TPZkWsT/Revlon.png"
        },
        {
          "id": 3,
          "brand_name": "Avon",
          "brand_img": "https://i.ibb.co/fFfpqyk/Avon.png"
        },
        {
          "id": 4,
          "brand_name": "Coty",
          "brand_img": "https://i.ibb.co/Nn7wFB4/Coty.png"
        },
        {
          "id": 5,
          "brand_name": "Dior",
          "brand_img": "https://i.ibb.co/nRfqxTS/Dior.png"
        },
        {
          "id": 6,
          "brand_name": "Chanel",
          "brand_img": "https://i.ibb.co/BK8cMHh/Chanel.png"
        },
      ]
      res.send(category);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req,res)=>{
    res.send('Brand-Shop-server is running');
})


app.listen(port, ()=>{
    console.log(`Brand-Shop-server is running on PORT: ${port}`)
})

