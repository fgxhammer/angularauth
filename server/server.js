// Express server
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const PORT = 3000
const api = require("./routes/api")
const app = express()

// Cors for Access-Control-Allow-Origin
app.use(cors())

app.use(bodyParser.json())
app.use("/api", api)
app.get("/", (req, res) => {
    res.send("Hello from server")
})

app.listen(PORT, () => {
    console.log("## " + new Date() + " => server listening on port ",PORT) 
})
