import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../database/models/SequelizeTeam';
import ITeam from '../Interfaces/ITeam';

class TeamService {
  private teamModel = TeamModel;

  public async getAll(): Promise<ServiceResponse<ITeam[]>> {
    const data = await this.teamModel.findAll();
    console.log(data);
    // const mappedData = data.map((team) => team.toJSON());
    return { status: 'SUCCESSFUL', data };
  }

  public async getById(id: number): Promise<ServiceResponse<ITeam | null>> {
    const data = await this.teamModel.findByPk(id);
    return { status: 'SUCCESSFUL', data };
  }
}

export default TeamService;
