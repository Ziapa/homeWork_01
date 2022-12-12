import express, {Request, Response} from 'express'
import {videoRouter} from "./router/video-router";
import {testingRouter} from "./router/testing-router";

export const app = express()
const PORT = 3003


app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Samurai!!!!')
})

app.use('/videos', videoRouter)
app.use('/testing', testingRouter)

app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})

