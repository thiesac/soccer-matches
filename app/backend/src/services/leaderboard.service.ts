import SequelizeTeam from '../database/models/SequelizeTeam';
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

    const sortedLeaderboard = LeaderboardService.sortLeaderboard(homeLeaderboard);

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
      if ((a.goalsBalance ?? 0) !== (b.goalsBalance ?? 0)) {
        return (a.goalsBalance ?? 0) - (b.goalsBalance ?? 0);
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

  private static calculateTotalGames(matches: IMatch[], teamId: number): number {
    return matches.reduce((totalGames, match) => {
      if (match.homeTeamId === teamId || match.awayTeamId === teamId) {
        return totalGames + 1;
      }
      return totalGames;
    }, 0);
  }

  private static calculateTotalVictories(matches: IMatch[], teamId: number): number {
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
    return matches.reduce((totalDraws, match) => {
      if (match.homeTeamGoals === match.awayTeamGoals
        && (match.homeTeamId === teamId || match.awayTeamId === teamId)) {
        return totalDraws + 1;
      }
      return totalDraws;
    }, 0);
  }

  private static calculateTotalLosses(matches: IMatch[], teamId: number): number {
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
    return matches.reduce((totalGoalsOwn, match) => {
      if (match.homeTeamId === teamId) {
        return totalGoalsOwn + match.awayTeamGoals;
      } if (match.awayTeamId === teamId) {
        return totalGoalsOwn + match.homeTeamGoals;
      }
      return totalGoalsOwn;
    }, 0);
  }

  private static async fetchTeamName(teamId: number): Promise<string> {
    const team = await SequelizeTeam.findByPk(teamId);
    return team ? team.teamName : '';
  }

  private static calculateEfficiency(matches: IMatch[], teamId: number): string {
    const totalPoints = matches.reduce((acc, match) => {
      if (match.homeTeamId === teamId || match.awayTeamId === teamId) {
        return acc + LeaderboardService.calculateTotalPoints(match);
      }
      return acc;
    }, 0);

    if (totalPoints === 0) {
      return '0.00';
    }

    const totalGames = LeaderboardService.calculateTotalGames(matches, teamId);
    const efficiency = (totalPoints / (totalGames * 3)) * 100;

    return efficiency.toFixed(2);
  }

  private static calculateGoalsBalance(matches: IMatch[], teamId: number): number {
    return matches.reduce((goalsBalance, match) => {
      if (match.homeTeamId === teamId) {
        return goalsBalance + match.homeTeamGoals - match.awayTeamGoals;
      } if (match.awayTeamId === teamId) {
        return goalsBalance + match.awayTeamGoals - match.homeTeamGoals;
      }
      return goalsBalance;
    }, 0);
  }

  private static async createLeaderboardEntry(match: IMatch): Promise<ILeaderboard> {
    const totalPoints = LeaderboardService.calculateTotalPoints(match);
    const totalGames = LeaderboardService.calculateTotalGames([match], match.homeTeamId);
    const totalVictories = LeaderboardService.calculateTotalVictories([match], match.homeTeamId);
    const totalDraws = LeaderboardService.calculateTotalDraws([match], match.homeTeamId);
    const totalLosses = LeaderboardService.calculateTotalLosses([match], match.homeTeamId);
    const goalsFavor = LeaderboardService.calculateGoalsFavor([match], match.homeTeamId);
    const goalsOwn = LeaderboardService.calculateGoalsOwn([match], match.homeTeamId);
    const goalsBalance = LeaderboardService.calculateGoalsBalance([match], match.homeTeamId);
    const efficiency = LeaderboardService.calculateEfficiency([match], match.awayTeamId);
    const teamName = await LeaderboardService.fetchTeamName(match.homeTeamId);

    return {
      name: teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  }
}

export default LeaderboardService;
