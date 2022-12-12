import {Request, Response, Router} from "express";
import {videoRepositories} from "../repositories/video-repositories";


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
    // res.send(videos)
    res.send(videoRepositories.findVideos())
})
videoRouter.get('/:id', (req: Request, res: Response) => {
    // let video = videos.find(v => v.id === +req.params.id)
    // if (video) {
    //     res.send(video)
    // } else {
    //     res.send(404)
    // }
    const foundVideo = videoRepositories.findVideos(req.params.id)
    if (foundVideo) {
        res.send(foundVideo)
    } else {
        res.send(404)
    }
})
videoRouter.post('/', (req: Request, res: Response) => {

//     const createdAt = new Date()
//     const publicationDate = new Date()
//     publicationDate.setDate(createdAt.getDate() + 1)
//
//     const newVideo = {
//         id: +(new Date()),
//         title: req.body.title,
//         author: req.body.author,
//         canBeDownloaded: false,
//         minAgeRestriction: null,
//         createdAt: createdAt.toISOString(),
//         publicationDate: publicationDate.toISOString(),
//         availableResolutions: req.body.availableResolutions
//     }
//
// inputValidator(req.body.title, res, "title", "should be a string")
// inputValidator(req.body.author, res, "author", "should be a string")
//
//     if (newVideo) {
//         videos.push(newVideo)
//         res.status(201).send(newVideo)
//     } else {
//         res.send(400)
//     }

   type ErrorsMessagesType = {
        message: string, field: string
    }

    type ErrorsType = {errorsMessages: Array<ErrorsMessagesType>}


    const errors: ErrorsType = {errorsMessages: []}

    if (!req.body.title.trim()) {
        errors.errorsMessages.push({message: "bad request", field: "title"})
    }

    if (req.body.title === null) {
        errors.errorsMessages.push({message: "bad request", field: "title"})
    }

    if (errors.errorsMessages.length > 0) {
        res.status(500).send(errors)
    }

    const newVideo = videoRepositories.createVideo(req.body)
    if (newVideo) {
        res.status(201).send(newVideo)
    } else {

    }

})
videoRouter.put('/:id', (req: Request, res: Response) => {
    // let video = videos.find(v => v.id === +req.params.id)
    // if (video) {
    //     video.title = req.body.title
    //     video.author = req.body.author
    //     video.availableResolutions = req.body.availableResolutions
    //     video.canBeDownloaded = true
    //     video.minAgeRestriction = req.body.minAgeRestriction
    //     // video.publicationDate = req.body.publicationDate
    //     res.send(204)
    // } else {
    //     res.send(404)
    // }
    const video = videoRepositories.updateVideo(req.body, req.params.id)
    if (video) {
        res.send(204)
    } else {
        res.send(404)
    }
})
videoRouter.delete('/:id', (req: Request, res: Response) => {
    // for (let i = 0; i < videos.length; i++) {
    //     if (videos[i].id === +req.params.id) {
    //         videos.splice(i, 1)
    //         res.send(204)
    //         return
    //     }
    // }
    if (videoRepositories.deleteVideoBeId(req.params.id)){
        res.send(204)
    } else {
        res.send(404)
    }
})
