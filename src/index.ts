import express, {Request, Response} from 'express'
import {videoRouter} from "./router/video-router";
import bodyParser from "body-parser";

const app = express()
const PORT = 3003

app.use(bodyParser({}))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!!!!')
})

app.use('/videos', videoRouter)


app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})