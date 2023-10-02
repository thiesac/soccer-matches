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

    it('Should return all matches when no query parameter is provided', async() => {
      findAllStub.resolves(mockMatches.arrayMatches);

      const response = await chai.request(app).get('/matches')

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(mockMatches.arrayMatches)
    }) // IT

    it('Should return only finished matches when "finished" query parameter is set to "true"', async () => {
      const finishedMatches = mockMatches.arrayMatches.filter(match => !match.inProgress);

      findAllStub.resolves(finishedMatches);

      const response = await chai.request(app).get('/matches?finished=true');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(finishedMatches);
    }); // IT

    it('Should return only inProgress matches', async () => {
      findAllStub.resolves(mockMatches.arrayInProgressMatches);

      const response = await chai.request(app).get('/matches?finished=false');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(mockMatches.arrayInProgressMatches);
    }); // IT
  }) // DESCRIBE ENDPOINT MATCHES
}) // OUTER DESCRIBE