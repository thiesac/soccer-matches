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

      const response = await chai.request(app).get('/matches?inProgress=true');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(finishedMatches);
      expect(response.body.every((match: any) => match.inProgress === false)).to.be.true;
    }); // IT

    it('Should return only inProgress matches', async () => {
      findAllStub.resolves(mockMatches.arrayInProgressMatches);

      const response = await chai.request(app).get('/matches?inProgress=false');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(mockMatches.arrayInProgressMatches);
    }); // IT

    describe('Endpoint /matches (POST)', () => {
      let createStub: sinon.SinonStub;
      let validToken: string;

      beforeEach(async() => {
        createStub = sinon.stub(SequelizeMatches, 'create');

        const loginResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'admin@admin.com',
            password: 'secret_admin',
          });

        validToken = loginResponse.body.token;
      });

      it('Should create a new match in progress and return it', async () => {
        console.log('Before createStub');
        createStub.resolves({ ...mockMatches.newMatchBody, id: 70, inProgress: true });
        console.log('After createStub');

        const response = await chai
          .request(app)
          .post('/matches')
          .set('Authorization', `Bearer ${validToken}`)
          .send(mockMatches.newMatchBody);

        console.log(response);
        expect(response.status).to.equal(201);
        expect(response.body).to.deep.equal(mockMatches.newMatchResult);
      });
    }); // IT
  }) // DESCRIBE ENDPOINT MATCHES
}) // OUTER DESCRIBE