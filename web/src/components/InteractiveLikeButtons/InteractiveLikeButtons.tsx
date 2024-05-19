import './interactive-like-buttons.css';

const InteractiveLikeButtons = ({ likes, dislikes, onLike, onDislike, likeCase }: any) => {
    return (
        <div >
            <button className={likeCase === 1 ? "liked-btn" : ""} onClick={onLike}>Like</button>
            <span style={{ color: "#f9d3b4" }}>{likes - dislikes}</span>
            <button className={likeCase === -1 ? "disliked-btn" : ""} onClick={onDislike}>Dislike</button>

        </div>
    );
};


export default InteractiveLikeButtons;