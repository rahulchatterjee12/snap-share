import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Like from "@/models/posts/likeModel";
import { getDAtaFromToken } from "@/helpers/getDataFromToken";
import { Server } from "socket.io";

const io = new Server();

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { postId } = reqBody;
    const userId = await getDAtaFromToken(request)?.id;

    const currentLike = await Like.findOne({ userId, postId });

    if(!currentLike){
      const newLike = new Like({
        userId,
        postId,
      });
      await newLike.save();
      const allLikes = await Like.find({  postId });
  
      
      io.emit("like-update", { postId, comments: allLikes });
      return NextResponse.json({
        message: "Post liked successfully",
        success: true,
      });
    }
    else{
      io.emit("like-update", { postId, comments:['hi'] });
    return NextResponse.json({ error: "unable to like" }, { status: 404 });
    }

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
