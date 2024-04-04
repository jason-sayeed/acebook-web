import React, { useState, useEffect } from "react"; // added 
//import { useState, useEffect } from "react"; commented this out
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
//import { likePost } from "../../services/like"; //added import
import Post from "../../components/Post/Post";
import CreatePost from "../../components/Post/CreatePost";
import Navbar from "../../components/NavBar/Navbar";
import UserDetails from "../../components/User/UserDetails";
import LikeButton from "../../components/LikeButton/LikeButton"; //added import
import "./FeedPage.css";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate(); 

  const fetchPosts = () => { //added
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
   }; //added

   useEffect(() => { //added
     fetchPosts(); // Fetch posts when component mounts 
      //fetch posts every 5 seconds 
     const interval = setInterval(fetchPosts, 5000); 
     return () => clearInterval(interval); // Cleanup interval on component unmount 
   }, [navigate]); // dont know how this works
   const token = localStorage.getItem("token"); 
   if (!token) { 
     navigate("/login"); 
     return null; // Return null if token is not available
   }

   // new function to update posts with new like status
   const updatePostLike = (postId, isLiked) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, isLiked };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

   // new function ends here 


   

   return (
    <>
      <Navbar />
      <UserDetails />
      <div className="feed-page">
        <h2>Your feed</h2>
        <div className="createpost" role="feed">
          <CreatePost />
        </div>
        <div className="post_list" role="feed">
          {posts.map((post) => (
            <div key={post._id}>
              <Post post={post} />
              <LikeButton
                postId={post._id}
                userId={post.userId}
                isLiked={post.isLiked}
                updatePost={updatePostLike}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};




