import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  private leaderboardService = LeaderboardService;

  async gerHomeLeaderboard(_req: Request, res: Response): Promise<Response> {
    const data = await this.leaderboardService.getHomeLeaderboard();
    console.log(data);
    return res.status(200).json(data);
  }
}

export default LeaderboardController;
