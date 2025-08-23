const cron = require("node-cron");
const axios = require("axios");
const { Character, Origin } = require("../models");

async function updateCharacters() {
  try {
    console.log("Updating characters...");

    const { data } = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );

    for (const char of data.results) {
      let origin = null;
      if (char.origin?.name && char.origin?.url) {
        origin = await Origin.findOrCreate({
          where: { name: char.origin.name },
          defaults: { name: char.origin.name },
        });
      }

      await Character.upsert({
        external_id: char.id,
        name: char.name,
        species: char.species,
        status: char.status,
        gender: char.gender,
        originId: origin ? origin[0].id : null,
      });
    }

    console.log("Characters updated! :D");
  } catch (error) {
    console.error("Error updating characters:", error.message);
  }
}

//every 12
cron.schedule("0 */12 * * *", () => {
  updateCharacters();
});

module.exports = updateCharacters;
