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

  async getAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async getById(id: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData === null) return null;

    const { teamName } = dbData;
    return { id, teamName };
  }
}
