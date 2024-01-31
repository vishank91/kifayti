const express = require("express")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const router = require("./routes/router")
const app = express()
 
app.use(express.json())
app.use(cors())
app.set(express.static("./public"))
app.use(express.static(path.join(__dirname, 'build')));

app.use("/api",router)
app.use("/public", express.static("public"))
app.use('*', express.static(path.join(__dirname, 'build')))

require("./dbConnect")

let port = process.env.PORT || 8000
app.listen(port,()=>console.log(`Server is Running at http://localhost:${port}`))
