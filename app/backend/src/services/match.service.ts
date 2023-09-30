import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/IMatch';
import MatchModel from '../database/models/SequelizeMatches';

class MatchService {
  private matchModel = MatchModel;

  public async getAll(): Promise<IMatch[]> {
    const data = await this.matchModel.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam' },
        { model: SequelizeTeam, as: 'awayTeam' },
      ],
    });
    return data;
  }
}

export default MatchService;
