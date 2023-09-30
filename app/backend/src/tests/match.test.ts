import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Sequelize } from 'sequelize';
import SequelizeMatches from '../database/models/SequelizeMatches';
import mockMatches from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

afterEach(() => {
  sinon.restore();
});

describe('MATCH', () => {
  describe('Endpoint /matches', () => {
    let findAllStub: sinon.SinonStub;

    beforeEach(() => {
      findAllStub = sinon.stub(SequelizeMatches, 'findAll');
    })

    it('Should return all matches', async() => {
      findAllStub.resolves(mockMatches.arrayMatches);

      const response = await chai.request(app).get('/matches')

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(mockMatches.arrayMatches)
    }) // IT
  }) // DESCRIBE ENDPOINT MATCHES
}) // OUTER DESCRIBE