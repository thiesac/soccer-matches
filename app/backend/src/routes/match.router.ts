import * as express from 'express';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';

const MatchRouter = express.Router();

const matchService = new MatchService();
const matchController = new MatchController(matchService);

MatchRouter.get('/', (req, res) => {
  matchController.getAll(req, res);
});

export default MatchRouter;
