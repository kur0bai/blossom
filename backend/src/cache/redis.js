import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379),
  password: process.env.REDIS_PASSWORD || undefined,
  lazyConnect: true,
});

export async function connectRedis() {
  if (redis.status === "end" || redis.status === "wait") {
    await redis.connect();
  }
  return redis;
}

export default redis;
