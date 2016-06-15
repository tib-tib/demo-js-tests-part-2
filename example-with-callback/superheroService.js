var SuperheroModel = require('./SuperheroModel');
var logger = require('./logger');

module.exports = {
  getSuperheroesList: function (callback) {
    SuperheroModel.find(function (error, superheroes) {
      if(error) {
        logger.error(error);
      }
      return callback(error, superheroes);
    });
  }
};
