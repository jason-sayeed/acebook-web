import React, { useState } from "react";
import { createNewPost } from "../../services/posts";
import "./CreatePost.css";

const CreatePost = () => {
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
    console.log("Selected file:", file); //WORKED!! Stored in DB
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const postData = {
      message: newPost,
      image: postImage,
    };
    //new code starts here
    if (newPost.trim() !== "" || postImage) {
      createNewPost(token, postData)
        .then(() => {
          console.log("Post created successfully");
          setNewPost("");
          setPostImage("");
        })
        .catch((error) => {
          console.error("Error creating post:", error);
        });
    } else {
      console.log("Cannot submit empty post");
    }
  };
    //new code ends here

//original code below
    //createNewPost(token, postData)
      //.then(() => {
        //console.log("Post created successfully");
        //setNewPost("");
        //setPostImage("");
     // })
      //.catch((error) => {
        //console.error("Error creating post:", error);
      //});
  //};
  // original code above

  return (
    <div className="create-post-container">
      <input className="post-input"
        type="text"
        value={newPost}
        onChange={handlePostChange}
        placeholder="Type your post message here..."
      />
      

      <div className="buttons-container">
        <label className="image-button" htmlFor="fileInput">
          Add image
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />

        <div className="create-post">
          <button onClick={handleSubmit}>Post</button>
        </div>

      </div>
    

    </div>
  );
};

export default CreatePost;
