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
      completedMatches.map((match) => LeaderboardService.createLeaderboardEntry(match)),
    );

    const reducedLeaderboard = LeaderboardService.reduceTeam(homeLeaderboard); // Reduce the leaderboard

    const sortedLeaderboard = LeaderboardService.sortLeaderboard(reducedLeaderboard); // Sort the reduced leaderboard

    return sortedLeaderboard;
  }

  private static sortLeaderboard(leaderboard: ILeaderboard[]): ILeaderboard[] {
    return leaderboard.sort((a, b) => {
      // Sort by totalPoints
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      // Sort by totalVictories
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }

      // Sort by goalsBalance in ascending order (lower goals balance comes first)
      //  nullish coalescing (??) operators to provide default values for goalsBalance in case they are undefined
      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }

      // Sort by goalsFavor
      return b.goalsFavor - a.goalsFavor;
    });
  }

  private static reduceTeam(leaderboard: ILeaderboard[]): ILeaderboard[] {
    return leaderboard.reduce((acc, curr) => {
      const findName = acc.find(({ name }) => name === curr.name);
      if (!findName) acc.push(curr);
      else {
        findName.totalPoints += curr.totalPoints;
        findName.totalGames += curr.totalGames;
        findName.totalVictories += curr.totalVictories;
        findName.totalDraws += curr.totalDraws;
        findName.totalLosses += curr.totalLosses;
        findName.goalsFavor += curr.goalsFavor;
        findName.goalsOwn += curr.goalsOwn;
        findName.goalsBalance += curr.goalsBalance;
        findName.efficiency = LeaderboardService.calculateEfficiency(findName);
      }
      return acc
        .map((element) => (element.name === findName?.name ? findName : element)) as ILeaderboard[];
    }, [] as ILeaderboard[]);
  }

  private async getCompletedMatches(): Promise<IMatch[]> {
    const completedMatches = await this.matchService.getFiltered(false);
    return completedMatches;
  }

  private static calculateTotalPoints(match: IMatch): number {
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

  private static calculateEfficiency({ totalPoints, totalGames }: ILeaderboard): string {
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return efficiency.toFixed(2);
  }

  private static async createLeaderboardEntry(match: IMatch): Promise<ILeaderboard> {
    const totalPoints = LeaderboardService.calculateTotalPoints(match);
    const totalGames = 1;
    const totalVictories = match.homeTeamGoals > match.awayTeamGoals ? 1 : 0;
    const totalDraws = match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
    const totalLosses = match.homeTeamGoals < match.awayTeamGoals ? 1 : 0;
    const goalsBalance = match.homeTeamGoals - match.awayTeamGoals;
    const teamName = match.homeTeam?.teamName;

    return { name: teamName || '',
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor: match.homeTeamGoals,
      goalsOwn: match.awayTeamGoals,
      goalsBalance,
      efficiency: '' };
  }
}

export default LeaderboardService;
