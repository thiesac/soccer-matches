import ITeam from '../Interfaces/ITeam';
import { NewEntity } from '../Interfaces';
import { ITeamModel } from '../Interfaces/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async create(data: NewEntity<ITeam>): Promise<ITeam> {
    const dbData = await this.model.create(data);

    const { id, teamName }: ITeam = dbData;
    return { id, teamName };
  }
}
