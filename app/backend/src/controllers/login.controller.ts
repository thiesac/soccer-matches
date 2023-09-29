import { Request, Response } from 'express';
import UserService from '../services/user.service';

class LoginController {
  private userService: UserService;

  constructor(service: UserService) {
    this.userService = service;
  }

  async login(req: Request, res: Response): Promise<Response> {
    const loginData = req.body;
    const serviceResponse = await this.userService.findByEmail(loginData);

    // dica do Coruja, vai aceitar a mensagem mesmo que 'message' não tenha sido definido na interface LoginResponse
    if ('message' in serviceResponse) {
      if (serviceResponse.message === 'All fields must be filled') {
        return res.status(400).json({ message: serviceResponse.message });
      }
      if (serviceResponse.message === 'Invalid email or password') {
        return res.status(401).json({ message: serviceResponse.message });
      }
      if (serviceResponse.message === '"password" length must be at least 6 characters long') {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }

    return res.status(200).json(serviceResponse);
  }

  static async getUserRole(req: Request, res: Response): Promise<Response | void> {
    const { role } = req.body.token;
    return res.status(200).json({ role });
  }
}

export default LoginController;
