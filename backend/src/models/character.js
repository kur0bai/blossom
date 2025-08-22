module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define(
    "Character",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {}
  );

  return Character;
};
