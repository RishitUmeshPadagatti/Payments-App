const express = require('express')
const cors = require("cors")
// const { PrismaClient } = require('@prisma/client')
const {PrismaClient} = require("./generated/prisma")

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.get("/", async (req, res) => {
    try {
        const shops = await prisma.shop.findMany()
        res.json(shops)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Something went wrong" })
      }
})

app.get("/types", async (req, res) => {
    try {
        res.json(["CAFE", "BOOKSTORE", "PLANT", "STATIONARY", "BAKERY"])
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Something went wrong" })
    }
})

app.get("/business", async(req, res) => {
    try {
        const id = req.query.id;

        const data = await prisma.shop.findUnique({where: {id: id}})
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Something went wrong" })
    }
})

app.use(function (err, req, res, next){
    console.log(err + "\nERROR\n\n\n");
    res.status(500).json({message: "Server Error"})
})

app.listen(3000)