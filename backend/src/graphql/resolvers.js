const { Character } = require("../models");
const Redis = require("ioredis");
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

module.exports = {
  Query: {
    characters: async (_, filters) => {
      const key = `characters:${JSON.stringify(filters)}`;
      const cached = await redis.get(key);
      if (cached) return JSON.parse(cached);

      const where = {};
      Object.entries(filters).forEach(([k, v]) => {
        if (v) where[k] = v;
      });

      const results = await Character.findAll({ where });
      await redis.set(key, JSON.stringify(results), "EX", 60);
      return results;
    },
  },
};
