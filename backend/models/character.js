export default (sequelize, DataTypes) => {
  const Character = sequelize.define(
    "Character",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      external_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
      name: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM("Alive", "Dead", "unknown"),
        allowNull: false,
      },
      species: { type: DataTypes.STRING, allowNull: false },
      gender: {
        type: DataTypes.ENUM("Female", "Male", "Genderless", "unknown"),
        allowNull: false,
      },
      image: { type: DataTypes.STRING },
      origin_id: { type: DataTypes.INTEGER, allowNull: true },
    },
    { tableName: "characters", underscored: true }
  );

  Character.associate = (models) => {
    Character.belongsTo(models.Origin, {
      foreignKey: "origin_id",
      as: "origin",
    });
  };

  return Character;
};
