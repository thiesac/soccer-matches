import * as express from 'express';
import TeamController from '../controllers/team.controller';
import TeamService from '../services/team.service';

const TeamRouter = express.Router();

const teamService = new TeamService();
const teamController = new TeamController(teamService);

TeamRouter.get('/', (req, res) => {
  teamController.getAll(req, res);
});
TeamRouter.get('/:id', (req, res) => {
  teamController.getById(req, res);
});

export default TeamRouter;
