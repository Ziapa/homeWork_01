import {Request, Response, Router} from "express";
import { videos } from "..";



// const inputValidator = ( inputValue: any ,res: Response, field: string, message:string) => {
//     if (inputValue  !== String) {
//         res.status(400)
//             .send([
//                 {
//                     message: message,
//                     field: field
//                 }
//             ])
//         return
//     }
// }

export const videoRouter = Router()

videoRouter.get('/', (req: Request, res: Response) => {
    res.send(videos)
})
videoRouter.get('/:id', (req: Request, res: Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }
})
videoRouter.put('/:id', (req: Request, res: Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if (video) {
        video.title = req.body.title
        video.author = req.body.author
        res.send(201)
    } else {
        res.send(404)
    }
})
videoRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})
videoRouter.post('/', (req: Request, res: Response) => {

    const currentDate = new Date()
    const tomorrowDate = new Date(currentDate.getTime() + 86400000)

    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: currentDate.toISOString(),
        publicationDate: tomorrowDate.toISOString(),
        availableResolutions: req.body.availableResolutions
    }

// inputValidator(req.body.title, res, "title", "should be a string")
// inputValidator(req.body.author, res, "author", "should be a string")

    if (newVideo) {
        videos.push(newVideo)
        res.status(201).send(newVideo)
    } else {
        res.send(400)
    }
})