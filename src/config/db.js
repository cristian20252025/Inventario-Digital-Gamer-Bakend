import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
export const connectDB = async () => {
  try {
    await client.connect();
    console.log("✅ MongoDB conectado");
    return client.db(process.env.DB_NAME || "videojuegosDB");
  } catch (err) {
    console.error("❌ Error de conexión:", err);
    process.exit(1);
  }
};
