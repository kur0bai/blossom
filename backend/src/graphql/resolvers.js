const { Character, Origin } = require("../models");

const resolvers = {
  Query: {
    characters: async () => {
      return await Character.findAll({
        include: [{ model: Origin, as: "origin" }],
      });
    },
    character: async (_, { id }) => {
      return await Character.findByPk(id, {
        include: [{ model: Origin, as: "origin" }],
      });
    },
  },

  Mutation: {
    createCharacter: async (
      _,
      { external_id, name, species, status, gender, originId }
    ) => {
      return await Character.create({
        external_id,
        name,
        species,
        status,
        gender,
        originId,
      });
    },
  },
};

module.exports = resolvers;
