import React, { useState, useEffect } from "react";
import { getComments } from "../../services/comments";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const loggedInUser = localStorage.getItem("userId");

  const fetchComments = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getComments(postId, token) // Fetch comments for the specific post
        .then((data) => {
          console.log("Received comment data:", data);
          setComments(data.comments);
        })
        .catch((error) => console.error("Error fetching comments:", error));
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <div className="create-comment">
        <CreateComment postId={postId} updateCommentFeed={fetchComments} />
      </div>
      <Comment
        comments={comments}
        loggedInUser={loggedInUser}
        fetchComments={fetchComments}
      />
    </>
  );
};

export default Comments;
