import { DataTypes, Model } from 'sequelize';
import Team from '../../Interfaces/Team';
import sequelize from '.';
import MatchModel from './MatchModel';

class TeamModel extends Model<Team> {
  public id!: number;
  public teamName!: string;
}

TeamModel.init(
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

TeamModel.hasMany(MatchModel, { foreignKey: 'homeTeamId', as: 'homeMatches' });
TeamModel.hasMany(MatchModel, { foreignKey: 'awayTeamId', as: 'awayMatches' });

export default TeamModel;
