module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define(
    "Character",
    {
      external_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Alive", "Dead", "unknown"),
        allowNull: false,
        defaultValue: "unknown",
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Female", "Male", "Genderless", "unknown"),
        allowNull: false,
        defaultValue: "unknown",
      },
    },
    {
      tableName: "characters",
      timestamps: false,
    }
  );

  Character.associate = (models) => {
    Character.belongsTo(models.Origin, {
      foreignKey: "originId",
      as: "origin",
    });
  };

  return Character;
};
