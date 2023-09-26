import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeTeam from '../database/models/SequelizeTeam';
import mockTeams from './mocks/team.mock'
import TeamService from '../services/team.service';
// import TeamModel from '../models/team.model';

chai.use(chaiHttp);

const { expect } = chai;
afterEach(() => {
  sinon.restore();
});

describe('TEAM', () => {
  describe('Endpoint /teams', () => {
    let findAllStub: sinon.SinonStub;

    beforeEach(() => {
      findAllStub = sinon.stub(SequelizeTeam, 'findAll').resolves(mockTeams.newTeamsAll);
    });

    // afterEach(() => {
    //   findAllStub.restore();
    // });

    it('Should return correct status when finding all teams', async function() {
      const { status, body } = await chai.request(app).get('/teams')

      expect(status).to.equal(200);
        });
    })

  describe('Endpoint /teams/:id', () => {

    // afterEach(() => {
    //   sinon.restore();
    // });

    it('Should return team by id', async () => {
      let findOneStub: sinon.SinonStub;

      const serviceStub = findOneStub = sinon.stub(SequelizeTeam, 'findOne');
      const { body } = await chai.request(app).get('/teams/1')
      
      expect(body.status).to.equal('SUCCESSFUL');
      // expect(body.id).to.equal(1);
      // expect(body.teamName).to.equal('Avaí/Kindermann');
    });
  });

  // describe('SequelizeTeam', () => {
  //   describe('create', () => {
  //     it('should create a team and return its data', async () => {
  //       const data = { teamName: 'Avaí/Kindermann' };
  //       const createdTeam = await SequelizeTeam.create(data)

  //       expect(createdTeam).to.have.property('id');
  //       expect(createdTeam).to.have.property('teamName');
  //       expect(createdTeam.teamName).to.equal(data.teamName);
  //     });
  //   });
  // }); 

  describe('TeamModel', () => {
      describe('getAll', () => {
        it('should return all teams', async function () {
          const data = await SequelizeTeam.bulkBuild(mockTeams.allTeams);

          sinon.stub(SequelizeTeam, 'findAll').resolves(data);
        
        const { status, body } = await chai.request(app).get('/teams');
        expect(body.data).deep.equal(mockTeams.allTeams);
        expect(status).to.equal(200);
      });
    });
  });
});
