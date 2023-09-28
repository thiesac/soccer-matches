import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import { Sequelize } from 'sequelize';
import UserService from '../services/user.service';

chai.use(chaiHttp);

const { expect } = chai;

afterEach(() => {
  sinon.restore();
});

describe('LOGIN', () => {
  describe('endpoint /login', () => {
    let validToken: string;

    // beforeEach(async () => {
    //   const sequelize = new Sequelize({
    //     dialect: 'mysql',
    //     host: 'db',
    //     port: 3306,
    //     username: 'root',
    //     password: '123456',
    //     database: 'TRYBE_FUTEBOL_CLUBE',
    //   });
    //   await sequelize.sync({ force: true });

      
    // })
    it('should return a valid token when valid credentials are provided', async () => {
      
      const res = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token').that.is.a('string');
    })

    it('should return 401 with message "Invalid email or password" for an invalid email format', async () => {
      const res = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'notemail.com',
          password: 'password123',
        });

      expect(res).to.have.status(401);
      expect(res.body).to.have.property('message', 'Invalid email or password');
    });

    describe('endpoint /login/role', () => {
      beforeEach(async () => {
        const loginResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'admin@admin.com',
            password: 'secret_admin',
          });

        validToken = loginResponse.body.token;
      })
      describe('Role Endpoint', () => {
      
          it('should return the user role with a valid token', async () => {
            const res = await chai
              .request(app)
              .get('/login/role')
              .set('authorization', `Bearer ${validToken}`);

            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal({ role: 'admin' });
          });

        // it('should return a 401 status with "Token not found" message when no token is provided', async () => {
        //   const res = await chai.request(app).get('/login/role');

        //   expect(res).to.have.status(401);
        //   expect(res.body).to.deep.equal({ message: 'Token not found' });
        // });

        // it('should return a 401 status with "Token must be a valid token" message with an invalid token', async () => {
        //   const invalidToken = 'invalid_token_here';
        //   const res = await chai
        //     .request(app)
        //     .get('/login/role')
        //     .set('authorization', `Bearer ${invalidToken}`);

        //   expect(res).to.have.status(401);
        //   expect(res.body).to.deep.equal({ message: 'Token must be a valid token' });
        // });

      })
    })
  })
})