import {Request, Response, Router} from "express";
import {videos} from "../repositories/video-repositories";
import {testingRepositories} from "../repositories/testing-repositories";


export const testingRouter = Router()


testingRouter.delete('/all-data', (req: Request, res: Response) => {
    if (testingRepositories.deleteDB()) {
        res.status(204).send(videos)
    } else {
       res.status(404)
    }
})