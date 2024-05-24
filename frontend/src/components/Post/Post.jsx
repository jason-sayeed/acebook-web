import React, { useEffect } from "react";
import { LikePostButton } from "../Like/Like";
import Comments from "../Comment/Comments";
import "./Post.css";

const Post = ({ posts, loggedInUser, fetchPosts }) => {
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
    <>
      <div>
        {posts.map((post) => (
          <div className="post" key={post._id}>
            <div className="post-border">
              <div className="post-header-container">
                <img
                  className="post-profile_picture"
                  src={post.user.profilePicture}
                  alt="Profile"
                />
                <div>
                  <div className="post-user-fullName">{post.user.fullName}</div>
                  <div className="post-date">{formatDate(post.createdAt)}</div>
                </div>
              </div>
              {post.image && (
                <img className="post_image" src={post.image} alt="Post" />
              )}
              <div className="post-message">{post.message}</div>
              <div className="post-like-button">
                <LikePostButton
                  postId={post._id}
                  isLiked={post.likedBy.includes(loggedInUser)}
                  updatePostLikeFeed={fetchPosts}
                />
              </div>
              <div className="post-like-counter">{post.likedBy.length}</div>
            </div>
            <div>
              <Comments postId={post._id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Post;
