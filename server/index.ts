import express from "express"
import APIRouter from "./routes/main.routes";
import bodyParser from "body-parser"
import multer from "multer";
import errorsMiddleware from './middlewares/errors.middleware'


const PORT = process.env.PORT || 8080

const app = express()
app.use(bodyParser.json())
app.use(multer({ dest: "public/images" }).array("images"))
app.use('/api', APIRouter)
app.use(express.static('./public'))
app.use(errorsMiddleware)
app.listen(PORT, ()=> console.log("server started"))