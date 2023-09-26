import { IUserModel } from '../Interfaces/IUserModel';
import { NewEntity } from '../Interfaces';
import SequelizeUser from '../database/models/SequelizeUser';
import IUser from '../Interfaces/IUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async create(data: NewEntity<IUser>): Promise<IUser> {
    const dbData = await this.model.create(data);

    const { id, username, role, email, password }: IUser = dbData;
    return { id, username, role, email, password };
  }
}
