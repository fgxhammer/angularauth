// Api routes for express server
const express = require("express")
const router = express.Router()
const User = require("../models/user")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const USER = process.env.mongodb_user
const PASS = process.env.mongodb_pass

// Database connection string
const db = `mongodb+srv://${USER}:${PASS}@cluster0-8ozwu.mongodb.net/eventsdb?retryWrites=true&w=majority`

// Connect to mongodb
mongoose.connect(db, err => {
    if (err) {
        console.log("Error: ", err);
    } else {
        console.log("Connected to mongodb");
    }
})


// Middleware to verify jwt
verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request")
    }
    let token = req.headers.authorization.split(" ")[1]
    if (token === 'null') {
        return res.status(401).send("Unauthorized request")
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send("Unauthorized request")
    }
    req.userId = payload.subject
    next()
}


router.get("/", (req, res) => {
    res.send("From API route")
})

// Register route
router.post("/register", (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((err, registeredUser) => {
        if (err) {
            console.log("Error: ", err);
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

// Login route
router.post("/login", (req, res) => {
    let userData = req.body
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                res.status(401).send("Incorrect email or password!")
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }

        }
    })
})

// Mock event data
router.get("/events", (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]

    res.json(events)
})

// Mock special events data
router.get("/specialEvents", verifyToken, (req, res) => {
    let specialEvents = [
        {
            "_id": "1",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]

    res.json(specialEvents)
})

module.exports = router