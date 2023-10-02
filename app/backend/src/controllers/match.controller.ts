import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  private matchService: MatchService;

  constructor(service: MatchService) {
    this.matchService = service;
  }

  async getAll(req: Request, res: Response): Promise<Response | void> {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const filteredMatches = await this.matchService.getFiltered(true);
      return res.status(200).json(filteredMatches);
    } if (inProgress === 'false') {
      const finishedMatches = await this.matchService.getFiltered(false);
      return res.status(200).json(finishedMatches);
    }
    const allMatches = await this.matchService.getAll();
    return res.status(200).json(allMatches);
  }
}
export default MatchController;
