"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Post from "../Post";
import { io } from "socket.io-client";
let socket;

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
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    try {
      socket = io("http://localhost:3000/api/socket.io", {
        upgrade: false,
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("connected");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-5 w-[100vw] items-center flex-col mt-5">
      {data &&
        data.map((post) => (
          <Post
            key={post._id}
            title={post.title}
            description={post.description}
            postId={post._id}
          />
        ))}
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
