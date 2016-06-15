var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chai = require('chai');
var should = chai.should();
chai.use(sinonChai);

var superheroService = require('./superheroService');
var SuperheroModel = require('./SuperheroModel');
var logger = require('./logger');

var sandbox;
var findStub;

describe('superheroService', function() {
  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    findStub = sandbox.stub(SuperheroModel, 'find');
    sandbox.stub(logger, 'error');
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should return a list of superheroes', function() {
    var superheroesList = ['Batman', 'Superman', 'Iron Man', 'Captain America', 'Hulk'];
    findStub.returns(new Promise(function(resolve) { resolve(superheroesList) }));

    return superheroService.getSuperheroesList()
    .then(function(result) {
      result.should.deep.equal(superheroesList);
    });

  });

  it('should display an error if an error occured while retrieving the superheroes list from the API', function() {
    findStub.returns(new Promise(function(resolve, reject) { reject('A_BIG_ERROR') }));

    return superheroService.getSuperheroesList()
    .catch(function(error) {
      error.should.equal('A_BIG_ERROR');
      logger.error.should.have.been.calledWithExactly('A_BIG_ERROR');
    });
  });
})
