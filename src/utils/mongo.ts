import mongoose from "mongoose";

export async function connectToMongo() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/TutorialProject");
    console.log("Connected to Database");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
