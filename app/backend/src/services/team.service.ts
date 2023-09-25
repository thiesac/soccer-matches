import Team from '../Interfaces/Team';
import TeamModel from '../database/models/TeamModel';

async function getAll(): Promise<Team[]> {
  const teams = await TeamModel.findAll();
  return teams;
}

export default {
  getAll,
};
