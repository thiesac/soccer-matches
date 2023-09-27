import * as express from 'express';
import LoginController from '../controllers/login.controller';
import UserService from '../services/user.service';

const LoginRouter = express.Router();

const secretKey = 'secret_admin';

const userService = new UserService(secretKey);
const loginController = new LoginController(userService);

LoginRouter.post('/', (req, res) => {
  loginController.login(req, res);
});

export default LoginRouter;
