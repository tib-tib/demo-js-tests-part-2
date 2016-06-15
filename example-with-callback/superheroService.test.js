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
    findStub.callsArgWith(0, null, superheroesList);

    superheroService.getSuperheroesList(function (error, result) {
      should.not.exist(error);
      result.should.deep.equal(superheroesList);
    });
  });

  it('should log and return an error if there was an error retrieving the superheroes', function() {
    findStub.callsArgWith(0, 'A_BIG_ERROR');

    superheroService.getSuperheroesList(function (error, result) {
      error.should.equal('A_BIG_ERROR');
      should.not.exist(result);
      logger.error.should.have.been.calledWithExactly('A_BIG_ERROR');
    });
  });
})
