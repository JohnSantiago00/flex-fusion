"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Sample workout data
    const sampleWorkouts = [
      {
        userId: 1,
        name: "Monday Workout",
        day: "Monday", // Replace with the desired date
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        name: "Tuesday Workout",
        day: "Tuesday", // Replace with the desired date
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more sample workouts as needed
    ];

    // Insert the data into the 'workouts' table
    await queryInterface.bulkInsert("workouts", sampleWorkouts, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted data
    await queryInterface.bulkDelete("workouts", null, {});
  },
};