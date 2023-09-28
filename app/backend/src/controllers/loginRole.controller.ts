import AuthMiddleware from '../middlewares/auth.middleware';

class LoginRoleController {
  private authMiddleware: AuthMiddleware;
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
    this.authMiddleware = new AuthMiddleware(secretKey);
  }

  async getUserRole(req: Request, res: Response): Promise<Response | void> {
    const result = await this.authMiddleware(req, res);
    console.log(result.req)
  }
}

export default LoginRoleController;
