import * as express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';
import SequelizeMatches from '../database/models/SequelizeMatches';
import MatchService from '../services/match.service';

const LeaderboardRouter = express.Router();
const sequelizeMatches = new SequelizeMatches();
const matchService = new MatchService();
const leaderboardService = new LeaderboardService(sequelizeMatches, matchService);
const leaderboardController = new LeaderboardController(leaderboardService);

LeaderboardRouter.get('/home', (req, res) => {
  leaderboardController.getHomeLeaderboard(req, res);
});

export default LeaderboardRouter;
