import {Request, Response, Router} from "express";
import {videoRepositories, videosType} from "../repositories/video-repositories";


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


export enum ResolutionType {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160'
}

const validResolution = Object.values(ResolutionType)


const validator = (
    body: videosType,
) => {
    type ErrorsMessagesType = {
        message: string, field: string
    }

    type ErrorsType = { errorsMessages: Array<ErrorsMessagesType> }

    const errors: ErrorsType = {errorsMessages: []}

    body.availableResolutions?.map((value:any) => {
        if (!validResolution.includes(value)) {
            errors.errorsMessages.push({message: "bad request", field: "availableResolutions"})
        }
    })

    if (body.title === null || body.title.length > 40 || !body.title.trim()) {
        errors.errorsMessages.push({message: "bad request", field: "title"})
    }
    if (body.author === null || body.author.length > 20 || !body.author.trim()) {
        errors.errorsMessages.push({message: "bad request", field: "author"})
    }



    if (errors.errorsMessages.length) {
        return errors
    }
}

const validatorPut = (
    body: videosType,
) => {
    type ErrorsMessagesType = {
        message: string, field: string
    }

    type ErrorsType = { errorsMessages: Array<ErrorsMessagesType> }

    const errors: ErrorsType = {errorsMessages: []}

    body.availableResolutions?.map((value:any) => {
        if (!validResolution.includes(value)) {
            errors.errorsMessages.push({message: "bad request", field: "availableResolutions"})
        }
    })



    if (body.minAgeRestriction) {
        if (body.minAgeRestriction < 1 || body.minAgeRestriction > 18) {
            errors.errorsMessages.push({message: "bad request", field: "minAgeRestriction"})
        }

    }

    if (body.title === null || body.title.length > 40 || !body.title.trim()) {
        errors.errorsMessages.push({message: "bad request", field: "title"})
    }
    if (body.author === null || body.author.length > 20 || !body.author.trim()) {
        errors.errorsMessages.push({message: "bad request", field: "author"})
    }

    // @ts-ignore

    if ( body.canBeDownloaded !== true && body.canBeDownloaded !== false) {
        errors.errorsMessages.push({message: "bad request", field: "canBeDownloaded"})
    }


    if (errors.errorsMessages.length) {
        return errors
    }
}

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


    const errorsTitle = validator(req.body)
    if (errorsTitle) {
        res.status(400).send(errorsTitle)
    }

    const newVideo = videoRepositories.createVideo(req.body)
    if (newVideo) {
        res.status(201).send(newVideo)
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

    const errorsTitle = validatorPut(req.body)
    if (errorsTitle) {
        res.status(400).send(errorsTitle)
    }

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



    if (videoRepositories.deleteVideoBeId(req.params.id)) {
        res.send(204)
    } else {
        res.send(404)
    }
})
