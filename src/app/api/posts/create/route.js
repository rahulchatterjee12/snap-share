import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Post from "@/models/posts/postModel";
import { getDAtaFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { title, description, img } = reqBody;
    const userId = await getDAtaFromToken(request)?.id;

    const newPost = new Post({
      userId,
      title,
      description,
      img,
    });

    const savedPost = await newPost.save();

    return NextResponse.json({
      message: "Post created successfully",
      success: true,
      data: savedPost,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
