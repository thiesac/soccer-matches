import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  private matchService: MatchService;

  constructor(service: MatchService) {
    this.matchService = service;
  }

  async getAll(_req: Request, res: Response): Promise<Response | void> {
    const data = await this.matchService.getAll();
    res.status(200).json(data);
  }
}

export default MatchController;
