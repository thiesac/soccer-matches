import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import { Sequelize } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

afterEach(() => {
  sinon.restore();
});

describe('LOGIN', () => {
  describe('endpoint /login', () => {
    beforeEach(async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'db',
        port: 3306,
        username: 'root',
        password:  '123456',
        database: 'TRYBE_FUTEBOL_CLUBE',
      });
      await sequelize.sync({ force: true });
    })
    it('should return a valid token when valid credentials are provided', async function () {
      
      const res = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });

      expect(res).to.have.status(200);

    })
  })
})