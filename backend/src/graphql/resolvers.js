const { Character, Origin, Comment } = require("../models");

const resolvers = {
  Query: {
    characters: async () => {
      return await Character.findAll({
        include: [
          { model: Origin, as: "origin" },
          { model: Comment, as: "comments" },
        ],
      });
    },
    character: async (_, { id }) => {
      return await Character.findByPk(id, {
        include: [
          { model: Origin, as: "origin" },
          { model: Comment, as: "comments" },
        ],
      });
    },
    commentsByCharacter: async (_, { characterId }) => {
      return await Comment.findAll({
        where: { characterId },
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

    addComment: async (_, { characterId, content, userId }) => {
      return await Comment.create({
        characterId,
        content,
        userId,
      });
    },
  },
};

module.exports = resolvers;
