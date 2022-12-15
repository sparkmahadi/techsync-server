const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gp7ekja.mongodb.net/?retryWrites=true&w=majority`;
// const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const courseCategories = client.db("techsync").collection("categories");
    const coursesCollection = client.db("techsync").collection("courses");
    const courseDetailsCollection = client.db("techsync").collection("courseDetails");
    const faqsCollection = client.db("techsync").collection("faqs");
    const blogsCollection = client.db("techsync").collection("blogs");

    app.get('/', (req, res) => {
        res.send('techsync server is running')
    });
    
    app.get('/courses', async(req, res) => {
        const query = {};
        const result = await coursesCollection.find(query).toArray();
        res.send(result);
    })
    
    app.get('/course-categories', async(req, res) => {
        const query = {};
        const result = await courseCategories.find(query).toArray();
        res.send(result);
    })
    
    app.get('/course-details/:id', async(req, res) => {
        const id = parseInt(req.params.id);
        const query = {id: id};
        const result = await courseDetailsCollection.findOne(query);
        res.send(result);
    })
    
    app.get('/course-category/:level', async(req, res) => {
        const level = req.params.level;
        const query = {level: level};
        const result = await coursesCollection.find(query).toArray();
        res.send(result);
    })
    
    app.get('/faq', async(req, res) => {
        const query = {};
        const result = await faqsCollection.find(query).toArray();
        res.send(result);
    })
    
    app.get('/blog', async(req, res) => {
        const query = {};
        const result = await blogsCollection.find(query).toArray();
        res.send(result);
    })

}

run().catch(err => console.log(err))

app.listen(port, () => {
    console.log(`techsync data is running on port ${port}`);
});