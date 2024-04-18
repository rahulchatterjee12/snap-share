import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDAtaFromToken = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedToken;
  } catch (error) {
    throw new Error(error.message);
  }
};
