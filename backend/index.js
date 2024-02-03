const express = require("express")
const app = express()
const api = require("/dev/todolist/server/src/api")
const cors = require("cors")

const PORT = 3005
app.use(express.json())

app.use(cors());
app.use("/api" , api)
app.get("/" , (req, res) =>{
    res.setHeader('Content-Type', 'application/javascript');
    res.json({status : "worko"})
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));