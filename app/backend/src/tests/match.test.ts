import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
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
    let sequelizeStub;

    beforeEach(() => {
      sequelizeStub.sinon.stub(SequelizeMatches, 'findAll');
    })
    it('Should return all matches', async() => {
      sequelizeStub.resolves(mockMatches.arrayMatches);

      const { body }= await chai.request(app).get('/matches')

      expect(body).to.equal(mockMatches.arrayMatches)
    }) // IT
  }) // DESCRIBE ENDPOINT MATCHES
}) // OUTER DESCRIBE