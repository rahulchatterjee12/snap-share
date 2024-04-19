import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

export default function CommentField() {
  return (
    <Paper
      sx={{
        width: "100vw",
        position: "absolute",
        left: 0,
        bottom: 0,
        zIndex: 5,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Write your Comment..."
        inputProps={{ "aria-label": "write your comment..." }}
      />
      <IconButton
        color="primary"
        type="button"
        sx={{ p: "10px" }}
        aria-label="send"
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
