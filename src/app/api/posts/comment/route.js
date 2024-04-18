import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Comment from "@/models/posts/commentModel";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { userId, postId, comment } = reqBody;

    const newComment = new Comment({
      userId,
      postId,
      comment,
    });
    await newComment.save();

    return NextResponse.json({
      message: "Comment posted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
