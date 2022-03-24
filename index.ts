import APIRouter from "./server/routes/main.routes";
import bodyParser from "body-parser"
import errorsMiddleware from './server/middlewares/errors.middleware'
import express from "express"
import dotenv from 'dotenv'
import uploadCloud from "./server/cloudinary";
dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(uploadCloud.array("images"))
app.use('/api', APIRouter)
app.use(express.static('./server/public'))
app.use(errorsMiddleware)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
}
app.listen(process.env.PORT, () => console.log("server started"))