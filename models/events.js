const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init(
    {
      title: DataTypes.STRING,
      address: DataTypes.STRING,
      time: DataTypes.STRING,
      month: DataTypes.STRING,
      date: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      registration: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "events",
    }
  );
  return Event;
};
