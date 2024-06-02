// Besic Import
const express = require("express");
const router = require("./src/routes/api");
const app = new express();

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const path = require("path")


// First cors
app.use(cors())

// security  Implementation

app.use(helmet())
app.use(mongoSanitize())
app.use(cookieParser())
app.use(hpp())


// ratelimiter

const limiter = rateLimit({windowMs:15*60*1000, max:3000})
app.use(limiter)

// Database Connection

let URL = "mongodb://localhost:27017/MernEcommerce"
mongoose
    .connect(URL)
    .then((res)=>{
        console.log("Database Connected")
    })
    .catch((err)=>{
        console.log(err)
    })



// etag
app.set("etag", false)


// router
app.use("/api/v1", router)



app.use(express.static('client/dist'))



// exports

module.exports = app;
