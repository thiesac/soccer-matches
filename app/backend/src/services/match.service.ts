import IMatch from '../Interfaces/IMatch';
import MatchModel from '../database/models/SequelizeMatches';

class MatchService {
  private matchModel = MatchModel;

  public async getAll(): Promise<IMatch[]> {
    const data = await this.matchModel.findAll();
    return data;
  }
}

export default MatchService;
