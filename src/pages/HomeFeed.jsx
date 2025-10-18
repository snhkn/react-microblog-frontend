import { useEffect, useState } from "react";
import axios from "axios";

const HomeFeed = () => {

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ body: '' });

  //Fetch posts
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/public/posts")
      .then((response) => {
        console.log(response.data)
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  //Add new post
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/admin/posts", {
        body: newPost.body,
        author: "Guest",
      })
      .then((response) => {
        setPosts([response.data, ...posts]);
        setNewPost({ body: "" });
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  return (
    <main className="pt-20 max-w-2xl mx-auto px-4 text-black-100">
      <h1 className="text-2xl font-bold mb-4">Home Feed</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value.slice(0, 280) })}
            placeholder="What's on your mind?"
            className="w-full p-2 rounded bg-gray-700 text-white"
            rows="3"
        >
        </textarea>

        <p className="text-right text-gray-400 text-sm">
          {newPost.body.length}/280
        </p>


        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2 disabled:bg-gray-500"
          disabled={newPost.body.length === 0}
        >
          Post
        </button>


      </form>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-[rgba(255,255,255,0.05)] p-4 rounded-lg shadow"
          >
            <div className="font-semibold text-lg">{post.author} says:</div>
            <p className="mt-2 text-gray-500">{post.body}</p>
            <div className="text-gray-300 text-sm">{new Date(post.createdAt).toLocaleString()}</div>

          </div>
        ))}
      </div>
    </main>
  );
};

export default HomeFeed;
