import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import User from '../../Interfaces/User';

class UserModel extends Model<User> {
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  private password!: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
    underscored: true,
  },
);

export default UserModel;
