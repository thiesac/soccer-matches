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

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const numberId = Number(id);

    await this.matchService.finishMatch(numberId);

    res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this.matchService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'Match updated' });
  }

  async createMatch(req: Request, res: Response) {
    const serviceResponse = await this.matchService.createMatch(req.body);
    console.log('controller', serviceResponse);
    res.status(201).json(serviceResponse);
  }
}
export default MatchController;
