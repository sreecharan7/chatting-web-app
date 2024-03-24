import mongoose from "mongoose";

export const connect =  () => {
    try {
     mongoose.connect("mongodb://127.0.0.1:27017/chatting", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
}
