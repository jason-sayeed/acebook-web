import React, { useState } from "react";
import { createNewComment } from "../../services/comments";
import "./CreateComment.css";

const CreateComment = ({ postId, updateCommentFeed }) => {
  const [newComment, setNewComment] = useState("");

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const commentData = {
      postId: postId,
      comment_text: newComment,
    };

    createNewComment(token, commentData)
      .then(() => {
        console.log("Comment created successfully");
        setNewComment("");
        updateCommentFeed();
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <div className="create-comment-container">
      <input
        className="comment-input"
        type="text"
        value={newComment}
        onChange={handleChange}
        placeholder="Enter comment..."
      />
      <div className="create_comment_button">
        <button onClick={handleSubmit}>Create Comment</button>
      </div>
    </div>
  );
};

export default CreateComment;
