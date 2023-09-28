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
      return res.status(400).json({ message: serviceResponse.message });
    }

    return res.status(200).json(serviceResponse);
  }
}

export default LoginController;