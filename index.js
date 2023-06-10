const express = require('express')
const connection = require('./db')
const userRouter = require('./route/user.route')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())

app.use('/users',userRouter)


app.listen(8080,async()=>{
    try {
        await connection
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running at port 8080`)
})