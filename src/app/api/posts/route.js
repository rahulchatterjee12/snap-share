import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/posts/postModel";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
  try {
    const posts = await Post.find();

    return NextResponse.json({
      message: "Post fetched successfully",
      success: true,
      data: posts,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
