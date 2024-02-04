const express = require("express")
const app = express()
const routes = require("./routes")
const cors = require("cors")

const PORT = 3005 ||  process.env.PORT
app.use(express.json())

app.use(cors());
app.use("/api" ,routes )
app.get("/" , (req, res) =>{
    res.setHeader('Content-Type', 'application/javascript');
    res.json({status : "worko"})
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));