export default (sequelize, DataTypes) => {
  const Origin = sequelize.define(
    "Origin",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    { tableName: "origins", underscored: true }
  );

  Origin.associate = (models) => {
    Origin.hasMany(models.Character, { foreignKey: "origin_id" });
  };

  return Origin;
};
