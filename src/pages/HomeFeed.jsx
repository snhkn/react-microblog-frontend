import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/api";
import Post from "../components/shared/Post";

const HomeFeed = () => {

  const [posts, setPosts] = useState([]);

  //Fetch posts
  useEffect(() => {
    api
      .get("/public/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  //Edit a post
  const handleUpdated = (updatedPost) => {
    setPosts((prevPosts) =>
        prevPosts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
        )
    );
  };

  //Delete a post
  const handleDeleted = (postId) => {
    setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
    );
  };


  return (
    <main>
      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} onUpdated={handleUpdated} onDeleted={handleDeleted} />
        ))}
      </div>

    </main>
  );
};

export default HomeFeed;
