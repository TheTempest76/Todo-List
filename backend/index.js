const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3002;
const { MongoClient } = require("mongodb");
const router = express.Router()
app.use(cors());

const uri = process.env.MONGODB_URI || "mongodb+srv://afomega123:mLdirnXKFXxA3mSU@cluster0.59bik8l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);
const myDB = client.db("mycomp");
const myColl = myDB.collection("todos");
router.get("/", async (req, res) => {
  try {
    await client.connect();
    
    const tasks = await myColl.find().toArray();
    res.json(tasks);
    console.log(tasks[0]["task1"])
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
});
router.post("/", async (req, res) => {
    try {
      const doc = req.body;
      const result = await myColl.insertOne(doc);
      res.json({ message: 'Document inserted successfully', insertedId: result.insertedId });
    } catch (error) {
      console.error('Error while inserting document:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.delete("/", async (req, res) => {
    try {
      const filter = req.body;
      const deleteResult = await myColl.deleteOne(filter);
      if (deleteResult.deletedCount === 1) {
        res.json({ message: 'Document deleted successfully' });
      } else {
        res.status(404).json({ message: 'Document not found' });
      }
    } catch (error) {
      console.error('Error while deleting document:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.post("/updateStatus", async (req, res) => {
    try {
      const filter = { task1: req.body.task1 };
      const updateDoc = {
        $set: { status: req.body.status }
      };
      const result = await myColl.updateOne(filter, updateDoc);
      res.json({ message: 'Status updated successfully', matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
    } catch (error) {
      console.error('Error while updating status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.use(express.json());


app.use("/api", router); // Mount the router

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.json({status : "worko"});
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
