import './media-card.css';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import InteractiveLikeButtons from '../InteractiveLikeButtons/InteractiveLikeButtons';
import IMedia from '../../types/media.type';
import { takeActionOnMedia } from '../../services/media.service';
import toast from 'react-hot-toast';


const MediaCard = (media: IMedia) => {
    const [loaded, setLoaded] = useState(media.type !== 'image');
    const [like, setLike] = useState(media.like);
    const [likesCount, setLikeCount] = useState(media.likesCount ?? 0);
    const [dislikesCount, setDislikeCount] = useState(media.dislikesCount ?? 0);

    const handleLikeDislike = async (value: string) => {
        // check if user is logged in
        const token = localStorage.getItem('usertoken');
        if (!token) {
            toast.error('You need to login first!');
            return;
        }

        if (value === "like") {
            if (like === 1) {
                setLike(0);
                setLikeCount(likesCount - 1);
                await takeActionOnMedia(media._id, 'neutral').then((response: any) => {
                    console.log(response);
                    if (response.status !== 200) {
                        toast.error(response.data.message);
                        setLike(1);
                        setLikeCount(likesCount + 1);
                    }
                });
                //call api to with neutral case
                return;
            } else if (like === -1) {
                setLike(1);
                setDislikeCount(dislikesCount - 1);
            }
            // if like = 0
            setLike(1);
            setLikeCount(likesCount + 1);
            await takeActionOnMedia(media._id, 'like').then((response: any) => {
                if (response.status !== 200) {
                    toast.error(response.data.message);
                    setLike(0);
                    setLikeCount(likesCount - 1);
                }
            });
        } else {
            if (like === -1) {
                setLike(0);
                setDislikeCount(dislikesCount - 1);
                //call api to with neutral case
                await takeActionOnMedia(media._id, 'neutral').then((response: any) => {
                    console.log(response);
                    if (response.status !== 200) {
                        toast.error(response.data.message);
                        setLike(-1);
                        setDislikeCount(dislikesCount + 1);
                    }
                });
                return;
            } else if (like === 1) {
                setLike(-1);
                setLikeCount(likesCount - 1);
            }
            // if like = 0
            setLike(-1);
            setDislikeCount(dislikesCount + 1);
            await takeActionOnMedia(media._id, 'dislike').then((response: any) => {
                if (response.status !== 200) {
                    toast.error(response.data.message);
                    setLike(0);
                    setDislikeCount(dislikesCount - 1);
                }
            });
        }
    }

    return (
        <div className="media" key={media._id}>

            <div>
                {!loaded && <div>Loading...</div>}
                {loaded && media.type === 'video' ? (
                    <ReactPlayer
                        url={media.mediaUrl !== "" ? media.mediaUrl : "https://flutter.github.io/assets-for-api-docs/assets/videos/butterfly.mp4"} // Change to your video URL
                        controls
                        width="100%"
                        height="70%"
                    />
                ) : media.type === 'image' ? (
                    <img
                        src={media.mediaUrl !== "" ? media.mediaUrl : "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"} // Change to your image URL
                        alt={media.title}
                        loading='lazy'
                        width="100%"
                        height="70%"
                        onLoad={() => setLoaded(true)}
                    />
                ) : <img src={media.mediaUrl !== "" ? media.mediaUrl : "https://via.placeholder.com/400"} alt={media.title} />}
            </div>

            <div className="interactive-container">
                <h4>{media.title}</h4>

                <InteractiveLikeButtons likes={likesCount} dislikes={dislikesCount}
                    onLike={() => handleLikeDislike("like")}
                    onDislike={() => handleLikeDislike("dislike")}
                    likeCase={like} />

            </div>
        </div>
    );
}

export default MediaCard;