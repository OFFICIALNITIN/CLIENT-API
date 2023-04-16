require('dotenv').config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const port = process.env.PORT || 3001

//API security

//app.use(helmet())


//handle CORS error

app.use(cors())

//MongoDB Connection Setup
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/database', {
    useNewUrlParser: true
});


if (process.env.NODE_ENV !== 'production') {
    const MGDB = mongoose.connection
    MGDB.on("open", () => {
        console.log("MongoDB is connected")
    })

    MGDB.on("error", (error) => {
        console.log(error)
    })

    //Logger

    app.use(morgan("tiny"))
}



//Set body bodyParser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())




//Load routers

const userRouter = require("./src/routers/user.router")
const ticketRouter = require("./src/routers/ticket.router")


//Use Routers
app.use("/v1/user", userRouter)
app.use("/v1/ticket", ticketRouter)

//Error handler
const handleError = require("./src/utils/errorHandler")

app.use((req, res, next) => {
    const error = new Error("Resources not found!")
    error.status = 404

    next(error)
})

app.use((error, req, res, next) => {
    handleError(error, res)
})


app.listen(port, () => {
    console.log(`API is ready on http://localhost:${port}`)
})