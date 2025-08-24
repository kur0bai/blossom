"use strict";

const axios = require("axios");

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      let page = 1;
      let allCharacters = [];
      let allOrigins = new Set();
      let hasNext = true;

      while (hasNext) {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );

        data.results.forEach((c) => {
          if (c.origin?.name) allOrigins.add(c.origin.name);
        });

        allCharacters = [...allCharacters, ...data.results];
        page++;
        hasNext = !!data.info.next;
      }

      const originsArray = Array.from(allOrigins).map((name) => ({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("origins", originsArray, {});

      const originsFromDB = await queryInterface.sequelize.query(
        `SELECT id, name FROM origins;`,
        { type: Sequelize.QueryTypes.SELECT }
      );
      const originMap = {};
      originsFromDB.forEach((o) => {
        originMap[o.name] = o.id;
      });

      const charactersToInsert = allCharacters.map((character) => ({
        external_id: character.id,
        name: character.name,
        status: character.status || "unknown",
        species: character.species,
        gender: character.gender || "unknown",
        image: character.image,
        originId: originMap[character.origin?.name] || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("characters", charactersToInsert, {});
      console.log("Seed complete");
    } catch (error) {
      console.error("Error seeding characters & origins:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("characters", null, {});
    await queryInterface.bulkDelete("origins", null, {});
  },
};
