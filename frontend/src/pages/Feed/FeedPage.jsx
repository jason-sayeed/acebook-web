import React from "react";
import Posts from "../../components/Post/Posts";
import Navbar from "../../components/NavBar/Navbar";
import "./FeedPage.css";

export const FeedPage = () => {
  return (
    <>
      <Navbar />
      <div className="feed-page">
        <h2>Your feed</h2>
        <div>
          <Posts />
        </div>
      </div>
    </>
  );
};
