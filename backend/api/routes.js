const express = require("express")
const app = express()
const { MongoClient } = require("mongodb");

const router = express.Router()
const password = "lGjM9fNo7GFbzcLd"
const uri = `mongodb+srv://afomega123:${[password]}@cluster1.ev6sdcd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

 // for parsing application/json

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const myDB = client.db("todolist");
const myColl = myDB.collection("tasks");

router.get("/" , async(req ,res , next) =>{
    const task = await myColl.find().toArray()
    res.json(task)

})
router.get("/status" , async(req , res)=>{
    const taskId = req.query.taskId;
    const taskStatus = await myColl.findOne({"task1" : taskId})
    console.log(taskStatus.status)
    res.json(taskStatus.status)
})
router.post("/" ,async (req,res ,next)=>{

        const doc = req.body
        res.json(doc)
        const result = await myColl.insertOne(doc);
        console.log(
           `A document was inserted with the _id: ${result.insertedId}`,
        );
}
) 
router.post("/updateStatus", async (req , res)=>{
        const filter = {"task1" : req.body.task1}
        const updateDoc = {
            $set: {
              status : req.body.status
            },
          };
          const result = await myColl.updateOne(filter, updateDoc);
          // Print the number of matching and modified documents
          console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,);
})
router.delete("/", async (req, res) => {
    try {
        // Ensure req.body contains valid information for identifying the document(s) to be deleted
        const doc = req.body;
        console.log(req.body)
        
        // Perform the delete operation
        const deleteResult = await myColl.deleteOne(doc);

        // Check if a document was deleted successfully
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

module.exports = router