import {useState } from "react";

import api from "../api/api";

const NewPost = () => {

const [posts, setPosts] = useState([]);
const [newPost, setNewPost] = useState({ body: '' });

  //Add new post
  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/admin/posts", {
        body: newPost.body
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
      <h1 className="text-2xl font-bold mb-4">New Post</h1>

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

    </main>
  );
};

export default NewPost;
