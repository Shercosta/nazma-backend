/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("projects", [
      {
        name: "",
        link: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "",
        link: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "",
        link: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "",
        link: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "",
        link: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "",
        link: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("projects", null, {});
  },
};
