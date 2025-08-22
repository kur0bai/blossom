import { Op } from "sequelize";
import { models } from "../db/index.js";
import redis, { connectRedis } from "../cache/redis.js";

function keyFromArgs(args) {
  const { filter = {}, limit = 20, offset = 0 } = args || {};
  return `characters:${JSON.stringify({ filter, limit, offset })}`;
}

export const resolvers = {
  Query: {
    health: () => "ok",

    characters: async (_, args) => {
      await connectRedis();
      const key = keyFromArgs(args);
      const cached = await redis.get(key);
      if (cached) return JSON.parse(cached);

      const { filter = {}, limit = 20, offset = 0 } = args || {};
      const where = {};
      const include = [];

      if (filter.status) where.status = filter.status;
      if (filter.gender) where.gender = filter.gender;
      if (filter.species) where.species = { [Op.iLike]: `%${filter.species}%` };
      if (filter.name) where.name = { [Op.iLike]: `%${filter.name}%` };

      if (filter.origin) {
        include.push({
          model: models.Origin,
          as: "origin",
          where: { name: { [Op.iLike]: `%${filter.origin}%` } },
          required: true,
        });
      } else {
        include.push({ model: models.Origin, as: "origin" });
      }

      const { rows, count } = await models.Character.findAndCountAll({
        where,
        include,
        limit,
        offset,
        order: [["id", "ASC"]],
      });

      const payload = { total: count, items: rows };

      await redis.setex(
        key,
        Number(process.env.CACHE_TTL || 300),
        JSON.stringify(payload)
      );
      return payload;
    },
  },
};
