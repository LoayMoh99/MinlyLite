import { useState } from 'react';
import ReactPlayer from 'react-player';
import InteractiveLikeButtons from '../InteractiveLikeButtons/InteractiveLikeButtons';
import './media-card.css';
import IMedia from '../../types/media.type';


const MediaCard = (media: IMedia) => {
    const [loaded, setLoaded] = useState(media.type !== 'image');
    const [like, setLike] = useState(media.like);
    const [likesCount, setLikeCount] = useState(media.likesCount ?? 0);
    const [dislikesCount, setDislikeCount] = useState(media.dislikesCount ?? 0);

    const handleLikeDislike = (value: number) => {
        if (value === 1) {
            if (like === 1) {
                setLike(0);
                setLikeCount(likesCount - 1);
                //call api to with neutral case
                return;
            } else if (like === -1) {
                setLike(1);
                setDislikeCount(dislikesCount - 1);
            }
            setLike(1);
            setLikeCount(likesCount + 1);
        } else {
            if (like === -1) {
                setLike(0);
                setDislikeCount(dislikesCount - 1);
                //call api to with neutral case
                return;
            } else if (like === 1) {
                setLike(-1);
                setLikeCount(likesCount - 1);
            }
            setLike(-1);
            setDislikeCount(dislikesCount + 1);
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
                    onLike={() => handleLikeDislike(1)}
                    onDislike={() => handleLikeDislike(-1)}
                    likeCase={like} />

            </div>
        </div>
    );
}

export default MediaCard;