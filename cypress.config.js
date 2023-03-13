const { defineConfig } = require("cypress");
const { faker } = require('@faker-js/faker');
var moment = require('moment');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://qalab.pl.tivixlabs.com',
    viewportHeight: 720,
    viewportWidth: 1280,
    setupNodeEvents(on, config) {
      on("task", {
        generateUser() {
          user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email().toLowerCase(),
            cardNumber: faker.finance.account(16),
          };
          return user;
        },
        newDates() {
          dates = {
            pickup: moment().add(1,'days').format("YYYY-MM-DD"),
            dropoff: moment().add(8,'days').format("YYYY-MM-DD"),
            newDropoff: moment().add(9,'days').format("YYYY-MM-DD"),
          };
          return dates;
        },
      });
    },
  },
});
