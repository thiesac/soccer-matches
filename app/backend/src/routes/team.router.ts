import { Router } from 'express';
import teamController from '../controllers/team.controller';

const teamRouter = Router();

teamRouter.get('/', (req, res) => {
  teamController.getAll(req, res);
});
teamRouter.get('/:id', (req, res) => {
  teamController.getById(req, res);
});

export default teamRouter;
