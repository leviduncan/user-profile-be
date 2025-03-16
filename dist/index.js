require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 8800


app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

connectDB()

app.get("/", (req, res) => {
    res.send('Yes, we are good to go!')
})

const userRouter = require('./routes/api/userRoutes')
app.use('/api', userRouter)

app.listen(port, () => {
    console.log(`Server is up and running on Port: ${port}`)
})
