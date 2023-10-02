import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/IMatch';
import MatchModel from '../database/models/SequelizeMatches';

class MatchService {
  private matchModel = MatchModel;

  public async getAll(inProgressFilter: boolean | undefined): Promise<IMatch[]> {
    const whereCondition: { inProgress?: boolean } = {}; // initializes the object

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
}

export default MatchService;
