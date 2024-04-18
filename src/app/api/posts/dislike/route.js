import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Like from "@/models/posts/likeModel";

connect();

export async function DELETE(request) {
  try {
    const reqBody = await request.json();
    const { likeId } = reqBody;

    const like = await Like.findOne({ _id: likeId });

    return NextResponse.json({
      message: "Post disliked successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
