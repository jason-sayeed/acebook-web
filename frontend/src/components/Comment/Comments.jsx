import React, { useState, useEffect } from "react";
import { getComments } from "../../services/comments";
import { likeComment } from "../../services/like";
import "./Comments.css";

const LikeButton = ({ commentId, userId, isLiked, updateComment }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    try {
      await likeComment(commentId, userId);
      setLiked(!liked);
      updateComment(commentId, !liked); // Update the comment after like/unlike
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <button className="like-post" onClick={handleLike}>
      {liked ? "Unlike" : "Like"}
    </button>
  );
};

const Comment = ({ postId, userId }) => {
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getComments(postId, token) // Fetch comments for the specific post
        .then((data) => {
          console.log("Received comment data:", data);
          setCommentData(data.comments);
        })
        .catch((error) => console.error("Error fetching comments:", error));
    }
  }, [postId]);

  const addOrdinalSuffix = (day) => {
    if (day === 1 || day === 21 || day === 31) return day + "st";
    if (day === 2 || day === 22) return day + "nd";
    if (day === 3 || day === 23) return day + "rd";
    return day + "th";
  };

  const updateComment = (commentId, liked) => {
    // Update the state of the comment
    setCommentData((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId ? { ...comment, liked } : comment
      )
    );
  };

  return (
  <div>
    {commentData.map((comment) => {
      const date = new Date(comment.createdAt);
      const day = addOrdinalSuffix(date.getDate());
      const month = date.toLocaleString("en-GB", { month: "short" });
      const time = date.toLocaleString("en-GB", {
        hour: "numeric",
        minute: "numeric",
      });

      const formattedDate = `${day} ${month} ${date.getFullYear()} at ${time}`;

      return (
        <div className="comment-container" key={comment._id}>
          <div className="header-container">
            <img
              className="comment-profilePicture"
              src={comment.user.profilePicture}
            />
            <div className="comment-fullName">{comment.user.fullName}</div>
            {/* <div className="comment-date">{formattedDate}</div> */}
          </div>

          
          <div className="message">{comment.comment_text}</div>

          <div className="like-and-count_container">
            <div className="comment-like-count">{comment.likedBy.length}</div>
            <div className="comment-like-button"><LikeButton
              commentId={comment._id}
              userId={userId}
              isLiked={comment.liked}
              updateComment={updateComment}
            /> </div>
          </div>
          
        </div>
      );
    })}
  </div>
);
  }

  export default Comment;