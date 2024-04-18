import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection();
    connection.on("connected", () => {
      console.log("Database Connected Successfully");
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
}
