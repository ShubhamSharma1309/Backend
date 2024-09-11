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
 


export {app}