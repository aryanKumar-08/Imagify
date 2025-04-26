import express from 'express'
import cors from 'cors'
// import 'dotenv/config'
import dotenv from 'dotenv';

import connectDB from './config/mongodb.js'
import userRouter from './routes/user.route.js'
import imageRouter from './routes/image.route.js'

dotenv.config();
const PORT = process.env.PORT || 4000
const app = express()
app.use(express.json())
app.use(cors())
await connectDB()

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.get('/', (req, res)=>{
    res.send("Api is working")
})

app.listen(PORT, ()=> console.log("api is running on the port" + PORT) );