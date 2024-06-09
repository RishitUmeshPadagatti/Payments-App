const express = require("express")
const jwt = require('jsonwebtoken');
const { User, Account } = require("../db.js")
const { JWT_PASSWORD } = require("../config")
const signupBodySchema = require("../signupBodyScheme.js")
const signinBodySchema = require("../signinBodyScheme.js");
const updateUserDataSchema = require("../updateUserDataScheme.js");
const authMiddleware = require("../middleware.js");

const userRouter = express.Router()

userRouter.post("/signup", async (req, res) => {
    function capitalizeFirstAlphabet(name) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    const parsingResult = signupBodySchema.safeParse(req.body)
    if (!parsingResult.success) {
        return res.status(411).json({ message: parsingResult.error.errors[0].message })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })
    if (existingUser) {
        return res.status(411).json({ message: "User already exists" })
    }

    const createUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: capitalizeFirstAlphabet(req.body.firstname),
        lastname: capitalizeFirstAlphabet(req.body.lastname)
    })
    const userId = createUser._id

    await Account.create({
        userId: userId,
        balance: Math.floor(1 + (Math.random()*10000))
    })

    const token = jwt.sign({ userId }, JWT_PASSWORD)
    return res.status(200).json({ message: "User Created Successfully", token: token })
})

userRouter.post("/signin", async (req, res) => {
    const parsingResult = signinBodySchema.safeParse(req.body)
    if (!parsingResult.success) {
        return res.status(411).json({ message: parsingResult.error.errors[0].message })
    }

    const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if (existingUser) {
        const userId = existingUser._id
        const token = jwt.sign({ userId }, JWT_PASSWORD)
        return res.status(200).json({ token: token })
    }
    return res.status(411).json({ message: "Error while logging in" })
})

userRouter.put("", authMiddleware, async (req, res) => {
    const parsingResult = updateUserDataSchema.safeParse(req.body)
    if (!parsingResult.success) {
        return res.status(411).json({ message: parsingResult.error.errors[0].message })
    }
    await User.updateOne({ _id: req.headers.userId }, req.body)
    res.status(200).json({ message: "Updated Successfully" })
})

userRouter.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const userId = req.headers.userId;
    let searchResult;

    if (filter === "") {
        searchResult = await User.find({ _id: { $ne: userId } }).limit(15);
    } else {
        const regexFilter = new RegExp(filter, 'i'); // 'i' for case-insensitive
        searchResult = await User.find({
            _id: { $ne: userId },
            $or: [
                { firstname: regexFilter },
                { lastname: regexFilter }
            ]
        }).limit(15);
    }

    res.status(200).json({
        users: searchResult.map((element) => ({
            username: element.username,
            firstname: element.firstname,
            lastname: element.lastname,
            _id: element._id
        }))
    });
});



module.exports = userRouter