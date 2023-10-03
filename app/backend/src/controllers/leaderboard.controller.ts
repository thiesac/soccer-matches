import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service'; // Import the LeaderboardService

class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor(leaderboardService: LeaderboardService) {
    this.leaderboardService = leaderboardService;
  }

  async getHomeLeaderboard(_req: Request, res: Response): Promise<Response> {
    const data = await this.leaderboardService.getHomeLeaderboard();
    console.log(data);
    return res.status(200).json(data);
  }
}

export default LeaderboardController;
