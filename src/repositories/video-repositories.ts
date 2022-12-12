export type videosType = {
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


export const videoRepositories = {


    findVideos(id?: string | null) {
        if (id) {
            return videos.find(v => v.id === +id)
        } else {
            return videos
        }
    },
    createVideo(body: { title: string, author: string, availableResolutions: Array<string> }) {
        const createdAt = new Date()
        const publicationDate = new Date()
        publicationDate.setDate(createdAt.getDate() + 1)


        const newVideo = {
            id: +(new Date()),
            title: body.title,
            author: body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: createdAt.toISOString(),
            publicationDate: publicationDate.toISOString(),
            availableResolutions: body.availableResolutions
        }
        if (newVideo) {
            videos.push(newVideo)
            return newVideo
        }
    },
    updateVideo(body: {
        title: string,
        author: string,
        availableResolutions: Array<string>,
        minAgeRestriction: number,
        publicationDate: string
    }, id: string) {

        let video = videos.find(v => v.id === +id)
        if (video) {
            video.title = body.title
            video.author = body.author
            video.availableResolutions = body.availableResolutions
            video.canBeDownloaded = true
            video.minAgeRestriction = body.minAgeRestriction
            video.publicationDate = body.publicationDate
            return video
        }
    },
    deleteVideoBeId(id: string) {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === +id) {
                videos.splice(i, 1)
                return true
            }
        }
    }

}




