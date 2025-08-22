module.exports = (sequelize, DataTypes) => {
  const Origin = sequelize.define(
    "Origin",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "origins",
      timestamps: true,
    }
  );

  Origin.associate = (models) => {
    Origin.hasMany(models.Character, {
      foreignKey: "originId",
      as: "characters",
    });
  };

  return Origin;
};
