import { deletePost } from "../../services/posts";
import "./DeletePost.css";

const DeletePostButton = ({ postId, fetchPosts }) => {
  const handlePostDelete = async () => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(token, postId);
        fetchPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="delete-post">
      <button onClick={handlePostDelete}>Delete Post</button>
    </div>
  );
};

export default DeletePostButton;
