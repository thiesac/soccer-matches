import ITeam from './ITeam';

export interface ITeamModel {
  create(data: Partial<ITeam>): Promise<ITeam>,
  getAll(): Promise<ITeam[]>,
  getById(id: ITeam['id']): Promise<ITeam | null>
}
