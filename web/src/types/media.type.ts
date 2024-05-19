/**
 
            {
                "_id": "66489b224e0ca2a4ed67ec79",
                "title": "Video 2",
                "description": "This is video 2",
                "likesCount": 0,
                "dislikesCount": 0,
                "mediaUrl": "https://flutter.github.io/assets-for-api-docs/assets/videos/bee.mp4",
                "type": "video",
                "userId": "664122f9ef946f0d7514f5db",
                "userName": "Loay Mohamed",
                "createdAt": "2024-05-18T12:12:18.576Z",
                "updatedAt": "2024-05-18T13:42:13.282Z",
                "__v": 0,
                "like": 0
            }

 */
export type MediaType = 'image' | 'video' | 'text';
export default interface IMedia {
    _id: string,
    title: string,
    description?: string,
    likesCount?: number,
    dislikesCount?: number,
    mediaUrl: string,
    type: MediaType,
    like: number
}