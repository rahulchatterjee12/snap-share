import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log("Something went wrong", error);
  }
}
