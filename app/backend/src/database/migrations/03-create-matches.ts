import { Model, QueryInterface, DataTypes } from 'sequelize';
import IMatch from '../../Interfaces/IMatch';



export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatch>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'home_team_goals',
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'teams', key: 'id' },
        field: 'home_team_id',
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'teams', key: 'id' },
        field: 'away_team_id',
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'away_team_goals',
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'in_progress',
      }
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};