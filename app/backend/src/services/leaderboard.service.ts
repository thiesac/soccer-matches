import SequelizeMatches from '../database/models/SequelizeMatches';
import { ILeaderboard } from '../Interfaces/ILeaderboard';
import IMatch from '../Interfaces/IMatch';
import MatchService from './match.service';

class LeaderboardService {
  private sequelizeMatches: SequelizeMatches;
  private matchService: MatchService;

  constructor(sequelizeMatches: SequelizeMatches, matchService: MatchService) {
    this.sequelizeMatches = sequelizeMatches;
    this.matchService = matchService;
  }

  async getHomeLeaderboard(): Promise<ILeaderboard[]> {
    const completedMatches = await this.getCompletedMatches();

    const homeLeaderboard = await Promise.all(
      completedMatches.map((match) => this.createLeaderboardEntry(match)),
    );

    return homeLeaderboard;
  }

  private async getCompletedMatches(): Promise<IMatch[]> {
    // Use MatchService to fetch completed matches
    const completedMatches = await this.matchService.getFiltered(false);
    return completedMatches;
  }

  private static calculateTotalPoints(match: IMatch): number {
    // Calculate total points for a team based on the match result
    if (match.homeTeamGoals > match.awayTeamGoals) {
      // Home team won the match
      return 3;
    } if (match.homeTeamGoals === match.awayTeamGoals) {
      // Match ended in a draw
      return 1;
    }
    // Home team lost the match
    return 0;
  }

  private static calculateTotalGames(matches: IMatch[], teamId: number): number {
    // Calculate total games played by a team
    return matches.reduce((totalGames, match) => {
      if (match.homeTeamId === teamId || match.awayTeamId === teamId) {
        return totalGames + 1;
      }
      return totalGames;
    }, 0);
  }

  private static calculateTotalVictories(matches: IMatch[], teamId: number): number {
    // Calculate total victories for a team
    return matches.reduce((totalVictories, match) => {
      if (
        (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals)
        || (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals)
      ) {
        return totalVictories + 1;
      }
      return totalVictories;
    }, 0);
  }

  private static calculateTotalDraws(matches: IMatch[], teamId: number): number {
    // Calculate total draws for a team
    return matches.reduce((totalDraws, match) => {
      if (match.homeTeamGoals === match.awayTeamGoals
        && (match.homeTeamId === teamId || match.awayTeamId === teamId)) {
        return totalDraws + 1;
      }
      return totalDraws;
    }, 0);
  }

  private static calculateTotalLosses(matches: IMatch[], teamId: number): number {
    // Calculate total losses for a team
    return matches.reduce((totalLosses, match) => {
      if (
        (match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals)
        || (match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals)
      ) {
        return totalLosses + 1;
      }
      return totalLosses;
    }, 0);
  }

  private static calculateGoalsFavor(matches: IMatch[], teamId: number): number {
    // Calculate goals scored by a team
    return matches.reduce((totalGoalsFavor, match) => {
      if (match.homeTeamId === teamId) {
        return totalGoalsFavor + match.homeTeamGoals;
      } if (match.awayTeamId === teamId) {
        return totalGoalsFavor + match.awayTeamGoals;
      }
      return totalGoalsFavor;
    }, 0);
  }

  private static calculateGoalsOwn(matches: IMatch[], teamId: number): number {
    // Calculate goals conceded by a team
    return matches.reduce((totalGoalsOwn, match) => {
      if (match.homeTeamId === teamId) {
        return totalGoalsOwn + match.awayTeamGoals;
      } if (match.awayTeamId === teamId) {
        return totalGoalsOwn + match.homeTeamGoals;
      }
      return totalGoalsOwn;
    }, 0);
  }

  private async createLeaderboardEntry(match: IMatch): Promise<ILeaderboard> {
    const totalPoints = LeaderboardService.calculateTotalPoints(match);
    const teamId = match.homeTeamId; // Assuming you want the home team's ID
    const totalGames = LeaderboardService.calculateTotalGames([match], teamId);
    const totalVictories = LeaderboardService.calculateTotalVictories([match], teamId);
    const totalDraws = LeaderboardService.calculateTotalDraws([match], teamId);
    const totalLosses = LeaderboardService.calculateTotalLosses([match], teamId);
    const goalsFavor = LeaderboardService.calculateGoalsFavor([match], teamId);
    const goalsOwn = LeaderboardService.calculateGoalsOwn([match], teamId);

    return {
      name: match.homeTeam.teamName, // Assuming you want the home team's name
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
    };
  }
}

export default LeaderboardService;
