import React from "react";

const HomeFeed = () => {
  // temporary post list — later this will come from backend
  const posts = [
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

  return (
    <main className="pt-20 max-w-2xl mx-auto px-4 text-black-100">
      <h1 className="text-2xl font-bold mb-4">Home Feed</h1>

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
