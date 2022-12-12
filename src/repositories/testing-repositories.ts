import {videos} from "./video-repositories";


export const testingRepositories = {
deleteDB () {
    videos.splice(0)
    return true
}
}