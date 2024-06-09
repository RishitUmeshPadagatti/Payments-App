const express = require('express')
const mainRouter = require("./routers/index")
const { User } = require("./db")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1", mainRouter)

app.use(function (err, req, res, next){
    console.log(err + "\nERROR\n\n\n");
    res.status(500).json({message: "Server Error"})
})

app.listen(3000)