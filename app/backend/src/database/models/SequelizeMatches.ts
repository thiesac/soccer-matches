import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import SequelizeTeam from './SequelizeTeam';
import IMatch from '../../Interfaces/IMatch';

class SequelizeMatches extends Model<IMatch> {
  public id!: number;
  public homeTeamGoals!: number;
  public homeTeamId!: number;
  public awayTeamId!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

SequelizeMatches.init(
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
    // underscored: true,
  },
);

SequelizeTeam.hasMany(SequelizeMatches, { foreignKey: 'homeTeamId', as: 'homeMatches' });
SequelizeTeam.hasMany(SequelizeMatches, { foreignKey: 'awayTeamId', as: 'awayMatches' });

SequelizeMatches.belongsTo(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeMatches.belongsTo(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default SequelizeMatches;
