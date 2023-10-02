import * as express from 'express';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
import AuthMiddleware from '../middlewares/auth.middleware';
// import AuthMiddleware from '../middlewares/auth.middleware';

const MatchRouter = express.Router();

const matchService = new MatchService();
const matchController = new MatchController(matchService);

MatchRouter.get('/', (req, res) => {
  matchController.getAll(req, res);
});

MatchRouter.patch('/:id/finish', AuthMiddleware.validateToken, (req, res) => {
  matchController.finishMatch(req, res);
});

MatchRouter.patch('/:id', AuthMiddleware.validateToken, (req, res) => {
  matchController.updateMatch(req, res);
});

MatchRouter.post('/', AuthMiddleware.validateToken, (req, res) => {
  matchController.createMatch(req, res);
});

export default MatchRouter;
