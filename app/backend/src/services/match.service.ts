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

  // public async finishMatch(id: number): Promise<void> {
  //   const data = await this.matchModel.findByPk(id);
  //   console.log('linha 37', data);
  //   if (!data) {
  //     throw new Error('Match not found ');
  //   }
  //   data.inProgress = false;
  //   const teste = await data.save({ fields: ['inProgress'] });
  //   console.log('linha 43 service', teste);
  // }
}

export default MatchService;
