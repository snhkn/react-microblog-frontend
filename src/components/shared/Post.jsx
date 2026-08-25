import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-lg shadow">
      <div className="font-semibold text-lg text-blue-400">
        <Link to={`/profile/${post.userId}`}>{post.author}</Link>{" "}
        says:</div>
      <p className="mt-2 text-gray-300">{post.body}</p>
      <div className="text-gray-400 text-sm mt-1">
        {new Date(post.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default Post;
