// import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../database/models/SequelizeTeam';
import ITeam from '../Interfaces/ITeam';

class TeamService {
  private teamModel = TeamModel;

  public async getAll(): Promise<ITeam[]> {
    const data = await this.teamModel.findAll();
    // const mappedData = data.map((team) => team.toJSON());
    return data;
  }

  public async getById(id: number): Promise<ITeam | null> {
    const data = await this.teamModel.findByPk(id);
    return data;
  }
}

export default TeamService;
