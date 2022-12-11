import express, {Request, Response} from 'express'
import {videoRouter} from "./router/video-router";

export const app = express()
const PORT = 3003

type videosType = {
    id: number,
        title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: Array<string>
}

export let videos: Array<videosType> = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null ,
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

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Samurai!!!!')
})

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos = []
    res.status(204).send(videos)
})

app.use('/videos', videoRouter)



app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})

