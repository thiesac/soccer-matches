import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import SequelizeTeam from '../database/models/SequelizeTeam';
import mockTeams from './mocks/team.mock'


chai.use(chaiHttp);

const { expect } = chai;
afterEach(() => {
  sinon.restore();
});

describe('TEAM', () => {
  describe('Endpoint GET /teams', () => {
    let findAllStub: sinon.SinonStub;

    beforeEach(() => {
      findAllStub = sinon.stub(SequelizeTeam, 'findAll').resolves(mockTeams.newTeamsAll);
    });

    it('Should return correct status when finding all teams', async function() {
      const { status, body } = await chai.request(app).get('/teams')

      expect(status).to.equal(200);
        });
    })

  describe('Endpoint GET /teams/:id', () => {
    let findOneStub: sinon.SinonStub;

    beforeEach(() => {
      findOneStub = sinon.stub(SequelizeTeam, 'findOne');
    });

    it('Should return team by id', async () => {
      findOneStub.resolves(mockTeams.oneTeam);
      
      const { body } = await chai.request(app).get('/teams/1')
      
      expect(body.id).to.equal(1);
      expect(body.teamName).to.equal('Avaí/Kindermann');
    });
  }); 
});
