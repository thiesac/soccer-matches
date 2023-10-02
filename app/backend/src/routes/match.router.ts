import * as express from 'express';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
// import AuthMiddleware from '../middlewares/auth.middleware';

const MatchRouter = express.Router();

const matchService = new MatchService();
const matchController = new MatchController(matchService);

MatchRouter.get('/', (req, res) => {
  const inProgressFilter = req.query.inProgress === 'true';

  matchController.getAll(req, res, inProgressFilter);
});

export default MatchRouter;
