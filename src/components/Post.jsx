"use client";
import React, { useEffect } from "react";
import { Button, ButtonGroup } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import CommentBox from "./CommentBox";

const Post = ({ title, description, postId }) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const like = async () => {
    try {
      const response = await axios.post("/api/posts/like", { postId });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className=" sm:w-2/3 w-3/4 md:w-1/3  bg-white border border-gray-200 rounded-lg shadow ">
      <div>
        {/* <img
          className="rounded-t-lg"
          src="/docs/images/blog/image-1.jpg"
          alt="image"
        /> */}
      </div>
      <div className="p-5">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {title}
          </h5>
        </div>
        <p className="mb-3 font-normal text-gray-700 ">{description}</p>
        <ButtonGroup variant="text" color="secondary" fullWidth>
          <Button onClick={like} startIcon={<FavoriteIcon />}>
            5
          </Button>
          <Button onClick={() => setOpen(true)} startIcon={<CommentIcon />}>
            3
          </Button>
          <Button startIcon={<ShareIcon />}>Share</Button>
        </ButtonGroup>
      </div>
      <CommentBox open={open} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default Post;
