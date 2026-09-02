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


  return (
    <main>
      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>

    </main>
  );
};

export default HomeFeed;
