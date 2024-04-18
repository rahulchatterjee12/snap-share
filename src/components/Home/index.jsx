"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Post from "../Post";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/posts");
      setData(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {data &&
        data.map((post) => (
          <Post
            key={post._id}
            title={post.title}
            description={post.description}
            postId={post._id}
          />
        ))}
    </div>
  );
};

export default Home;
