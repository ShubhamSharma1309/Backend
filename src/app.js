import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser" // user ki cookies mai CRUD operation perform karne ke liye use hota hai...

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
 
//routes

import userRouter from './routes/user.routes.js'

//routes declaration 
app.use("/api/v1/users", userRouter)
//http://localhost:8000/api/v1/users/login  yeh se direct user routes mai jayega phir waha dekhega ki users ka baad kya likha hai,, isme login likha hai toh login route chalega phir...
export {app}