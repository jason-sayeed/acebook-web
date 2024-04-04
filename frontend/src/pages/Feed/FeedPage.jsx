import React, { useState, useEffect } from "react"; // added 
//import { useState, useEffect } from "react"; commented this out
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/Post/CreatePost";
import Navbar from "../../components/NavBar/Navbar";
import UserDetails from "../../components/User/UserDetails";
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
      //fetch posts every 10 seconds 
     const interval = setInterval(fetchPosts, 10000); 
     return () => clearInterval(interval); // Cleanup interval on component unmount 
   }, [navigate]); // dont know how this works
   const token = localStorage.getItem("token"); 
   if (!token) { 
     navigate("/login"); 
     return null; // Return null if token is not available
   }


   return (
     <>
       <Navbar />
       <UserDetails />
       <div className="feed-page">
       {/* <h1>Hello {fullName}</h1> */}
         <h2>Your feed</h2>
         <div className="createpost" role="feed">
           <CreatePost />
         </div>
         <div className="post_list" role="feed">
           {posts.map((post) => (
             <Post post={post} key={post._id} />
           ))}
         </div>
       </div>
     </>
   );
 };










