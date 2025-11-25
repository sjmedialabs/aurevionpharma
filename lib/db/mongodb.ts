import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://aurevion:aurevion123@aurevion-cluster.plvbx7e.mongodb.net/aurevion?retryWrites=true&w=majority&appName=aurevion-cluster"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var myMongoose: MongooseCache
}

const cached: MongooseCache = global.myMongoose || { conn: null, promise: null }

if (!global.myMongoose) {
  global.myMongoose = cached
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    console.log("🔗 Connecting to MongoDB:", MONGODB_URI.replace(/\/\/[^@]+@/, '//[credentials]@'))
    cached.promise = mongoose.connect(MONGODB_URI, opts)
  }

  try {
    cached.conn = await cached.promise
    console.log("✅ MongoDB connected successfully to:", cached.conn.connection.name)
  } catch (e) {
    cached.promise = null
    console.error("❌ MongoDB connection failed:", e)
    throw e
  }

  return cached.conn
}

export default connectDB
