import mongoose from "mongoose";

function getMongoUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }
  return uri;
}

type MongooseGlobal = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalCache = global as typeof globalThis & { mongoose?: MongooseGlobal };

if (!globalCache.mongoose) {
  globalCache.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (globalCache.mongoose?.conn) return globalCache.mongoose.conn;

  if (!globalCache.mongoose?.promise) {
    globalCache.mongoose!.promise = mongoose.connect(getMongoUri(), {
      bufferCommands: false,
    });
  }

  globalCache.mongoose!.conn = await globalCache.mongoose!.promise;
  return globalCache.mongoose!.conn;
}
