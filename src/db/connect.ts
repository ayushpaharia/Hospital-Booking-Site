import mongoose from "mongoose";
import config from "config";

export default async function connect() {
  const mongo_uri = config.get("mongo_uri") as string;
  try {
        await mongoose
            .connect(mongo_uri, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
            });
        return console.log("Database connected!");
    } catch (err) {
        console.log("dberror", err);
        process.exit(1);
    }
}
