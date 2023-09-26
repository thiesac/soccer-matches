import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import TeamModel from '../database/models/SequelizeTeam';
import mockTeams from './mocks/team.mock'
import TeamService from '../services/team.service';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  describe('Endpoint /teams', () => {
    let findAllStub: sinon.SinonStub;

    beforeEach(() => {
      findAllStub = sinon.stub(TeamModel, 'findAll').resolves(mockTeams.newTeamsAll);
    });

    afterEach(() => {
      findAllStub.restore();
    });

    it('Should return a list of teams', (done) => {
      chai
        .request(app)
        .get('/teams')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.deep.equal(mockTeams.allTeams);
          done();
        });
    })
  });

  describe('Endpoint /teams/:id', () => {
    let findOneStub: sinon.SinonStub;
    beforeEach(() => {
      findOneStub = sinon.stub(TeamModel, 'findOne');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should return data of a specific team when a valid id is provided', async () => {
      findOneStub.resolves(mockTeams.oneTeam);

      const res = await chai.request(app).get('/teams/1');

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(mockTeams.oneTeam);
    });
  });

  describe('Endpoint /login', () => {
    let authService: AuthService;

    beforeEach(() => {
      authService = new AuthService();
    })

    afterEach(() => {
      sinon.restore();
    });

    describe('POST /login', () => {
      it('should login with valid credentials and return a token', (done) => {
        chai
          .request(app)
          .post('/login')
          .send({ email: 'valid@example.com', password: 'validpassword' })
          .end(async (err, res) => {
            // expect(err).to.be.null;
            expect(res).to.have.status(200);
            // expect(res.body).to.have.property('token');
            done();
          })
      })
    })
  })
});
