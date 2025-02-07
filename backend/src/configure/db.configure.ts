import mongoose from "mongoose";

const connect = async (): Promise<void> => {
   try {
      const connect = await mongoose.connect(process.env.MONGO_URL as string);
      console.log(`MongoDB connected seccussfully`);
   } catch (err) {
      console.error(err);
      process.exit(1); // Exit process with failure
   }
};

export default connect;