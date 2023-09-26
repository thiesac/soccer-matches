import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import TeamModel from '../database/models/TeamModel';
import mockTeams from './mocks/team.mock'

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  describe('Endpoint /teams', () => {
    let findAllStub: sinon.SinonStub;

    beforeEach(() => {
      findAllStub = sinon.stub(TeamModel, 'findAll');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should return a list of teams', async () => {
      findAllStub.resolves(mockTeams.allTeams);

      const res = await chai.request(app).get('/teams');

      expect(res.body).to.deep.equal(mockTeams.allTeams);
      expect(res.status).to.equal(200);
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0]).to.have.property('teamName');
    });
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
});
