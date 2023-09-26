import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import Match from '../../Interfaces/IMatch';

class MatchModel extends Model<Match> {
  public id!: number;
  public homeTeamGoals!: number;
  public homeTeamId!: number;
  public awayTeamId!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

MatchModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

export default MatchModel;
