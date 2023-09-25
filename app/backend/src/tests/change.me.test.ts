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
      findAllStub.resolves(mockTeams);

      const res = await chai.request(app).get('/teams');

      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.be.true;
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0]).to.have.property('teamName');
      expect(res.body).to.deep.equal(mockTeams);
    });
  });
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
