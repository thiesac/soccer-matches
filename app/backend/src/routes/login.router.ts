import * as express from 'express';
import LoginController from '../controllers/login.controller';
import UserService from '../services/user.service';
import AuthMiddleware from '../middlewares/auth.middleware';

const LoginRouter = express.Router();

const secretKey = process.env.JWT_SECRET || 'jwt_secret';

const userService = new UserService(secretKey);
const loginController = new LoginController(userService);

LoginRouter.post('/', (req, res) => {
  loginController.login(req, res);
});

LoginRouter.get('/role', AuthMiddleware.validateToken, (req, res) => {
  LoginController.getUserRole(req, res);
});

export default LoginRouter;
