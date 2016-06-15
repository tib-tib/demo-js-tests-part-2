// var promise = require('bluebird');

module.exports = {
  find: function() {
    return new Promise(
      function(resolve, reject) {
        resolve(['Superhero 1', 'Superhero2', 'Superhero3']);
      }
    );
  }
};
