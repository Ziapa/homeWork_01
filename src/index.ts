import express, {Request, Response} from 'express'
import {videoRouter} from "./router/video-router";
import bodyParser from "body-parser";

const app = express()
const PORT = 3003

export let videos = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2022-12-08T17:22:04.968Z",
        publicationDate: "2022-12-08T17:22:04.968Z",
        availableResolutions: [
            "P144"
        ]
    },
    {
        id: 1,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2022-12-08T17:22:04.968Z",
        publicationDate: "2022-12-08T17:22:04.968Z",
        availableResolutions: [
            "P144"
        ]
    }
]

app.use(bodyParser({}))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!!!!')
})
app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos = []
    res.send(204)
})

app.use('/videos', videoRouter)


app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})