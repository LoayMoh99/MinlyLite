
import { MediaModel } from '@/contracts/media';
import { mongoose } from '@/dataSources'
import { mediaService } from '@/services/mediaService';


(async () => {

    // const media = await mediaService.create({
    //     title: 'First Media',
    //     description: 'This is the first media',
    //     mediaUrl: 'https://source.unsplash.com/user/c_v_r/100x100',
    //     type: 'image',
    //     likesCount: 0,
    //     dislikesCount: 0,
    // })


    console.log("✅ Seeds executed successfully");
    await mongoose.stop()
})