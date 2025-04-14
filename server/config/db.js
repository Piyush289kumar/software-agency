import mongoose from "mongoose";

export const connectDB = async (app) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running at http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("DB connection Failed", error.message);
    process.exit(1);
  }
};
