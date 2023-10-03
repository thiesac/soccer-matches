import * as express from 'express';
import LoginController from '../controllers/leaderboard.controller';
// import LeaderboardService from '../services/leaderboard.service';
// import SequelizeMatches from '../database/models/SequelizeMatches';

const LeaderboardRouter = express.Router();

// const sequelizeMatches = new SequelizeMatches();
// const leaderboardService = new LeaderboardService(sequelizeMatches);
const leaderboardController = new LoginController();

LeaderboardRouter.get('/home', (req, res) => {
  leaderboardController.gerHomeLeaderboard(req, res);
});

export default LeaderboardRouter;
