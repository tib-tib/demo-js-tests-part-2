var promise = require('bluebird');

module.exports = {
  find: function() {
    return new promise(function (resolve, reject) {
      setTimeout(resolve(['Superhero 1', 'Superhero2', 'Superhero3']), 10000);
    });
  }
};
