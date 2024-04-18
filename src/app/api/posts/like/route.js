import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Like from "@/models/posts/likeModel";
import { getDAtaFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { postId } = reqBody;
    const userId = await getDAtaFromToken(request)?.id;

    const newLike = new Like({
      userId,
      postId,
    });
    await newLike.save();

    const allLikes = await Like.find({ userId, postId });

    io.emit("like-update", { postId, comments: allLikes });

    return NextResponse.json({
      message: "Post liked successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
