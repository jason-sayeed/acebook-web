import React, { useState } from "react";
import { createNewPost } from "../../services/posts";
import "./CreatePost.css";

const CreatePost = ({ updatePostFeed }) => {
  const [newPost, setNewPost] = useState("");
  const [postImage, setPostImage] = useState("");

  const handlePostChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setPostImage(base64Image);
    };
    reader.readAsDataURL(file);
    console.log("Selected file:", file);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const postData = {
      image: postImage,
      message: newPost,
    };
    createNewPost(token, postData)
      .then(() => {
        console.log("Post created successfully");
        setNewPost("");
        setPostImage("");
        updatePostFeed();
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
    console.log("Cannot submit empty post");
  };

  return (
    <div className="create-post-container">
      <input
        className="post-input"
        type="text"
        value={newPost}
        onChange={handlePostChange}
        placeholder="Create your post..."
      />

      <div className="buttons-container">
        <div className="create-post">
          <button onClick={handleSubmit}>Post</button>
        </div>
        <label className="image-button" htmlFor="fileInput">
          Add image
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default CreatePost;
