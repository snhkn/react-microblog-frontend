import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EditPost from "../../pages/EditPost";
import api from "../../api/api";

const Post = ({ post, onUpdated, onDeleted }) => {

  const [isEditing, setIsEditing] = useState(false);
  const { user: currentUser } = useSelector((state)=>state.auth);

  const handleDelete = async () => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
        await api.delete(`/posts/${post.id}`);
        onDeleted(post.id);
    } catch (error) {
        console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
    {isEditing ? (
      <EditPost
        post={post}
        onUpdated={(updatedPost)=>{
          onUpdated(updatedPost);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    ) : (
      <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-lg shadow">
        <div className="font-semibold text-lg text-blue-400">
          <Link to={`/profile/${post.userId}`}>{post.author}</Link>{" "}
          says:
        </div>
        <p className="mt-2 text-gray-300">{post.body}</p>
        <div className="text-gray-400 text-sm mt-1">
          {new Date(post.createdAt).toLocaleString()}
        </div>

        {post.userId === currentUser?.id && (
          <>
            <button type="button"
              className="mt-3 px-3 py-1.5 text-sm font-medium text-blue-400 border border-blue-400/50 rounded-md hover:bg-blue-400/10 transition"
              onClick={() => setIsEditing(true)}>
                Edit
            </button>
            <button type="button"
              className="mt-3 ml-2 px-3 py-1.5 text-sm font-medium text-red-400 border border-red-400/50 rounded-md hover:bg-red-400/10 transition"
              onClick={handleDelete}
            >
              Delete
            </button>


          </>
        )}

      </div>

    )}

    </div>


  );
};

export default Post;
