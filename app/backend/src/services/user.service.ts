import bcrypt = require ('bcryptjs');
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

    const user = await this.findUserByEmail(email);

    if (!user || !this.isValidPassword(user, password)) {
      return { message: 'Invalid email or password' };
    }

    const token = this.generateToken(user);

    return { token };
  }

  private async findUserByEmail(email: string): Promise<UserModel | null> {
    return this.userModel.findOne({ where: { email } });
  }

  // using arrow function so I do not have to use 'this' just because eslint requested
  private isValidPassword = (user: UserModel, password: string): boolean => {
    if (!user.password || typeof user.password !== 'string') {
      return false;
    }
    return bcrypt.compareSync(password, user.password);
  };

  private generateToken(user: UserModel): string {
    return this.jwtToken.generateToken({
      sub: user.id.toString(),
      email: user.email,
    });
  }
}

export default UserService;
