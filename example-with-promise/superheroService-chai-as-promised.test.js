var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

var should = chai.should();

var superheroService = require('./superheroService');
var SuperheroModel = require('./SuperheroModel');
var logger = require('./logger');

chai.use(chaiAsPromised);
chai.use(sinonChai);

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

    return superheroService.getSuperheroesList().should.become(superheroesList);
  });

  it('should display an error if an error occured while retrieving the superheroes list from the API', function() {
    findStub.returns(new Promise(function(resolve, reject) { reject('A_BIG_ERROR') }));

    return superheroService.getSuperheroesList().should.be.rejectedWith('A_BIG_ERROR')
    .then(function() {
      logger.error.should.have.been.calledWithExactly('A_BIG_ERROR');
    });
  });
})
