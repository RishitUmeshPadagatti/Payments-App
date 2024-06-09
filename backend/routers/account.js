const express = require("express")
const { User, Account } = require("../db.js")
const authMiddleware = require("../middleware")
const { default: mongoose } = require("mongoose")

const accountRouter = express.Router()

accountRouter.use(authMiddleware)

accountRouter.get("/balance", async (req, res)=>{
    const userId = req.headers.userId;
    const user = await Account.findOne({
        userId: userId
    })
    try{
        res.status(200).json({balance: user.balance})
    } catch{
        res.status(400).json({message: "Inavlid User"})
    }
})

accountRouter.post("/transfer", async (req, res) => {
    const amount = req.body.amount
    const to = req.body.to
    const session = await mongoose.startSession();

    session.startTransaction()

    const fromAccount = await Account.findOne({userId: req.headers.userId}).session(session)
    if (fromAccount.balance < amount){
        await session.abortTransaction()
        return res.status(400).json({message: "Insufficient Balance"})
    }

    try{
        await Account.findOne({userId: to}).session(session)
    }
    catch{
        await session.abortTransaction()
        return res.status(400).json({message: "Invalid Account"})
    }

    await Account.updateOne({userId: req.headers.userId}, {$inc: {balance: -amount}}).session(session)
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)

    await session.commitTransaction()

    res.status(200).json({message: "Transfer Successful"})
})

module.exports = accountRouter