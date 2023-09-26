import Team from '../Interfaces/Team';
import TeamModel from '../database/models/TeamModel';

class TeamService {
  private teamModel = TeamModel;

  public async getAll(): Promise<Team[]> {
    const data = await this.teamModel.findAll();
    return data.map((team) => team.toJSON());
  }

  public async getById(id: number): Promise<Team | null> {
    const data = await this.teamModel.findByPk(id);
    return data;
  }
}

export default TeamService;
