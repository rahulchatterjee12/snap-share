import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";

const Post = ({ title, description, postId }) => {
  const like = async () => {
    try {
      const response = await axios.post("/api/posts/like", { postId });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
      <div>
        <img
          className="rounded-t-lg"
          src="/docs/images/blog/image-1.jpg"
          alt="image"
        />
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
          <Button startIcon={<CommentIcon />}>3</Button>
          <Button startIcon={<ShareIcon />}>Share</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Post;
