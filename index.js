const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0oc3y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const productCollections = client.db("emajohn").collection('product');

        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollections.find(query);
          //  const products = await cursor.limit(10).toArray(); //for limited product
            const products = await cursor.limit(10).toArray();
            res.send(products);
        });


    }
    finally {

    }
};

run().catch(console.dir());

app.get('/', (req, res) => {
    res.send("Ema-John Server is running");
});

app.listen(port, () => {
    console.log("ema-john is running at ", port);
});