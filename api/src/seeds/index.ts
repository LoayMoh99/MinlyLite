
import { mongoose, redis } from '@/dataSources'
import { mediaService } from '@/services/mediaService';

export const mediaUrls = [
    'https://source.unsplash.com/user/c_v_r/100x100',
    'https://source.unsplash.com/user/c_v_r/200x200',
    'https://source.unsplash.com/user/c_v_r/300x300',
    'https://source.unsplash.com/user/c_v_r/400x400',
    'https://source.unsplash.com/user/c_v_r/500x500',
    'https://source.unsplash.com/user/c_v_r/600x600',
    'https://source.unsplash.com/user/c_v_r/700x700',
    'https://source.unsplash.com/user/c_v_r/800x800',
    'https://source.unsplash.com/user/c_v_r/900x900',
    'https://source.unsplash.com/user/c_v_r/1000x1000',
];

export const videoUrls = [
    'https://flutter.github.io/assets-for-api-docs/assets/videos/butterfly.mp4',
    'https://flutter.github.io/assets-for-api-docs/assets/videos/bee.mp4',
];

redis.run();
(async () => {

    await mongoose.run();

    // create a dummy user using this id 664122f9ef946f0d7514f5db
    const user: any = {
        id: '664122f9ef946f0d7514f5db',
        firstName: 'Loay',
        lastName: 'Mohamed'
    }


    // add some media as images and few as videos with dummy title and description
    for (let i = 0; i < 10; i++) {
        await mediaService.create({
            title: `Image ${i + 1}`,
            description: `This is image ${i + 1}`,
            mediaUrl: mediaUrls[i],
            type: 'image',
            likesCount: 0,
            dislikesCount: 0,
        }, user)
    }

    for (let i = 0; i < 5; i++) {
        await mediaService.create({
            title: `Video ${i + 1}`,
            description: `This is video ${i + 1}`,
            mediaUrl: videoUrls[i % 2],
            type: 'video',
            likesCount: 0,
            dislikesCount: 0,
        }, user)
    }

    console.log("✅ Seeds executed successfully");
    await mongoose.stop()
})