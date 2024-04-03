import React from "react";
import { useState } from "react";


const Like = () => {
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const toggleLike = () => {
        if (like) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1); 
        }
        setLike(!like); 
    };

    return (
        <div>
            <button onClick={toggleLike}>
                {like ? "Unlike" : "Like"}
            </button>
            <p>Likes: {likeCount}</p>
        </div>
    );
};

export default Like;
