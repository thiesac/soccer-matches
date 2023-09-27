import { Request, Response } from 'express';
import TeamService from '../services/team.service';

class TeamController {
  private teamService: TeamService;

  constructor(service: TeamService) {
    this.teamService = service;
  }

  async getAll(_req: Request, res: Response) {
    const data = await this.teamService.getAll();
    res.status(200).json(data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const numberId = Number(id);

    const data = await this.teamService.getById(numberId);

    if (!data) res.status(400).json({ error: 'Invalid ID' });

    res.status(200).json(data);
  }
}

export default TeamController;
