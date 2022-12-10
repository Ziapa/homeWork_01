import request from 'supertest'
import {app} from "../../index";
describe('/videos', () => {

    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/videos')
            .expect(200, [
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
            ])
    })

})