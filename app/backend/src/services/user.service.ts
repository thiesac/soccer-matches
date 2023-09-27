import { IUserLogin } from '../Interfaces/IUser';
import UserModel from '../database/models/SequelizeUser';
import loginSchema from './validations/schemas';

interface ErrorResponse {
  status: number;
  data: {
    message: string;
  };
}

class UserService {
  private userModel = UserModel;

  async findByEmail(loginData: IUserLogin): Promise<IUserLogin | ErrorResponse | null> {
    const { error } = loginSchema.validate({ loginData });

    if (error) {
      return { status: 400, data: { message: error.message } };
    }
    const { email } = loginData;
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }
}

export default UserService;
