import React, { useState, useEffect } from "react";
import { getPosts } from "../../services/posts";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("userId");

  const fetchPosts = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="createpost">
        <CreatePost updatePostFeed={fetchPosts} />
      </div>
      <div>
        <Post
          posts={posts}
          loggedInUser={loggedInUser}
          fetchPosts={fetchPosts}
        />
      </div>
    </>
  );
};

export default Posts;
