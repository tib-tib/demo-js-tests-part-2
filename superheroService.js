var SuperheroModel = require('./SuperheroModel');
var logger = require('./logger');

module.exports = {
  getSuperheroesList: function () {
    return SuperheroModel.find()
    .then(function (superheroes) {
      return superheroes;
    })
    .catch(function (error) {
      logger.error(error);
      throw error;
    });
  }
};
