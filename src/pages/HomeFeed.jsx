import { useEffect, useState } from "react";
import axios from "axios";

const HomeFeed = () => {

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  //Fetch posts
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((response) => {
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
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: "New Post",
        body: newPost,
        userId: 1,
      })
      .then((response) => {
        setPosts([response.data, ...posts]);
        setNewPost("");
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
            value={newPost}
            onChange={(e)=>setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-2 rounded bg-gray-700 text-white"
            rows="3"
        >

        </textarea>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
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
            <div className="font-semibold text-lg">{post.author}</div>
            <div className="text-gray-300 text-sm">{post.date}</div>
            {/*<p className="mt-2">{post.content}</p>*/}
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="mt-2 text-gray-300">{post.body}</p>
            <div className="text-gray-400 text-sm mb-2">User {post.userId}</div>


          </div>
        ))}
      </div>
    </main>
  );
};

export default HomeFeed;
