"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId", // Specify the correct foreign key for the user association
      });
      this.belongsTo(models.Workout, {
        foreignKey: "workoutId", // Specify the correct foreign key for the workout association
      });
    }
  } // Remove the extra closing curly brace

  Exercise.init(
    {
      workoutId: DataTypes.INTEGER, // Add the workoutId field
      type: DataTypes.STRING,
      name: DataTypes.STRING,
      muscle: DataTypes.STRING,
      equipment: DataTypes.STRING,
      difficulty: DataTypes.STRING,
      day: DataTypes.STRING,
      week: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sets: DataTypes.INTEGER,
      reps: DataTypes.INTEGER,
      weight: DataTypes.FLOAT,
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [0, 5000],
        },
      },
    },
    {
      sequelize,
      modelName: "Exercise",
      tableName: "exercises",
    }
  );
  return Exercise;
};
