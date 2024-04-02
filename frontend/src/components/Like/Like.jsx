import React, { useState } from "react";
import { likePost } from "../../services/like";

const LikeButton = ({ postId, isLiked }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    try {
      await likePost(postId);
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <button className="like-post" onClick={handleLike}>
      {liked ? "Unlike" : "Like"}
    </button>
  );
};

export default LikeButton;