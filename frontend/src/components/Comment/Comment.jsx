import React from "react";
import { LikeCommentButton } from "../Like/Like";
import "./Comment.css";

const Comment = ({ comments, loggedInUser, fetchComments }) => {
  const addOrdinalSuffix = (day) => {
    if (day === 1 || day === 21 || day === 31) return day + "st";
    if (day === 2 || day === 22) return day + "nd";
    if (day === 3 || day === 23) return day + "rd";
    return day + "th";
  };

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = addOrdinalSuffix(date.getDate());
    const month = date.toLocaleString("en-GB", { month: "short" });
    const time = date.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "numeric",
    });

    return `${day} ${month} ${date.getFullYear()} at ${time}`;
  };

  return (
    <div>
      <div>
        {comments.map((comment) => (
          <div className="comment-container" key={comment._id}>
            <div className="comment-content">
              <div className="comment-user">
                <img
                  className="comment-profilePicture"
                  src={comment.user.profilePicture}
                  alt={comment.user.fullName}
                />
                <div className="comment-date-and-name">
                  <div className="comment-fullName">
                    {comment.user.fullName}
                  </div>
                  <div className="comment-date">
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
              </div>
              <div className="comment-text">{comment.comment_text}</div>
              <div className="comment-like-button">
                <LikeCommentButton
                  commentId={comment._id}
                  isLiked={comment.likedBy.includes(loggedInUser)}
                  updateCommentLikeFeed={fetchComments}
                />
              </div>
              <div className="comment-like-count">{comment.likedBy.length}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
