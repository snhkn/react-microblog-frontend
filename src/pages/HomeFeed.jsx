import { useState } from "react";

const HomeFeed = () => {
  // temporary post list — later this will come from backend
  const initialPosts = [
    {
      id: 1,
      author: "Alice",
      content: "Hello world! This is my first post 🚀",
      date: "2025-10-16",
    },
    {
      id: 2,
      author: "Bob",
      content: "Learning React step by step 💡",
      date: "2025-10-15",
    },
    {
      id: 3,
      author: "Charlie",
      content: "MicroBlog is coming alive!",
      date: "2025-10-14",
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
        id: posts.length + 1,
        author: "You",
        content: newPost,
        date: new Date().toLocaleDateString(),
    }
    setPosts([newEntry, ...posts]);
    setNewPost("");
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
            <p className="mt-2">{post.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HomeFeed;
