export default (sequelize, DataTypes) => {
  const Character = sequelize.define(
    "Character",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: DataTypes.STRING,
      status: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {}
  );
  return Character;
};
