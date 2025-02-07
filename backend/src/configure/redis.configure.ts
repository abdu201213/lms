import { createClient } from "redis";

const client = createClient({
  url: "redis://:<password>@redis-12696.crce176.me-central-1-1.ec2.redns.redis-cloud.com:12696",
});

client.on("error", (err) => console.error("Redis Error:", err));

async function connectRedis() {
  try {
    await client.connect();
    console.log("✅ Connected to Redis Cloud!");
  } catch (err) {
    console.error("❌ Redis Connection Failed:", err);
  }
}

connectRedis();

export default client;
