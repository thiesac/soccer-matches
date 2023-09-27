import {
  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';
import sequelize from '.';
import SequelizeModel from './SequelizeModel';

class SequelizeTeam extends Model<InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SequelizeTeam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

SequelizeTeam.hasMany(SequelizeModel, { foreignKey: 'homeTeamId', as: 'homeMatches' });
SequelizeTeam.hasMany(SequelizeModel, { foreignKey: 'awayTeamId', as: 'awayMatches' });

export default SequelizeTeam;
