import React, { useState } from "react";
import { likePost } from "../../services/like";
import { likeComment } from "../../services/like";
import "./Like.css";

export const LikeCommentButton = ({
  commentId,
  isLiked,
  updateCommentLikeFeed,
}) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    try {
      await likeComment(commentId);
      setLiked(!liked);
      updateCommentLikeFeed();
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  console.log(isLiked);

  return (
    <button className={!liked ? "like" : "unlike"} onClick={handleLike}>
      {liked ? "Unlike" : "Like"}
    </button>
  );
};

export const LikePostButton = ({ postId, isLiked, updatePostLikeFeed }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    try {
      await likePost(postId);
      setLiked(!liked);
      updatePostLikeFeed();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <button className={!liked ? "like" : "unlike"} onClick={handleLike}>
      {liked ? "Unlike" : "Like"}
    </button>
  );
};
