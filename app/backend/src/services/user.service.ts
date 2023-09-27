import JwtToken from '../auth/JwtToken';
import { IUserLogin } from '../Interfaces/IUser';
import UserModel from '../database/models/SequelizeUser';
import loginSchema from './validations/schemas';

interface ErrorResponse {
  message: string;
}

interface LoginResponse {
  token: string;
}

class UserService {
  private userModel = UserModel;
  private jwtToken: JwtToken;

  constructor(secretKey: string) {
    this.jwtToken = new JwtToken(secretKey);
  }

  async findByEmail(loginData: IUserLogin): Promise<LoginResponse | ErrorResponse> {
    const { email, password } = loginData;
    const { error } = loginSchema.validate({ email, password });

    if (error) {
      return { message: error.message };
    }

    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      return { message: 'User not found' };
    }

    const token = this.jwtToken.generateToken({ sub: user?.id.toString(), email: user?.email });

    return { token };
  }
}

export default UserService;
