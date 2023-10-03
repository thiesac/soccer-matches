import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/IMatch';
import MatchModel from '../database/models/SequelizeMatches';

interface ErrorResponse {
  message: string;
}
class MatchService {
  private matchModel = MatchModel;
  private sequelizeTeam = SequelizeTeam;

  public async getAll(): Promise<IMatch[]> {
    const data = await this.matchModel.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam' },
        { model: SequelizeTeam, as: 'awayTeam' },
      ],
    });
    return data;
  }

  public async getFiltered(inProgressFilter: boolean | undefined): Promise<IMatch[]> {
    const whereCondition: { inProgress?: boolean } = {};

    if (inProgressFilter !== undefined) {
      whereCondition.inProgress = inProgressFilter;
    }

    const data = await this.matchModel.findAll({
      where: whereCondition,
      include: [
        { model: SequelizeTeam, as: 'homeTeam' },
        { model: SequelizeTeam, as: 'awayTeam' },
      ],
    });
    return data;
  }

  public async finishMatch(id: number): Promise<void> {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<void> {
    await this.matchModel.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });
  }

  public async createMatch(match: IMatch): Promise<IMatch | ErrorResponse> {
    const awayTeam = await this.sequelizeTeam.findByPk(Number(match.awayTeamId));
    const homeTeam = await this.sequelizeTeam.findByPk(match.homeTeamId);

    if (awayTeam === null || homeTeam === null) {
      return { message: 'There is no team with such id!' };
    }
    if (awayTeam.id === homeTeam.id) {
      return { message: 'It is not possible to create a match with two equal teams' };
    }

    const matchWithInProgress = { ...match, inProgress: true };
    const dbData = await this.matchModel.create(matchWithInProgress);
    return dbData;
  }
}

export default MatchService;
