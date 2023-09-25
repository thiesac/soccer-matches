import Team from '../Interfaces/Team';
import TeamModel from '../database/models/TeamModel';

async function getAll(): Promise<Team[]> {
  const data = await TeamModel.findAll();
  return data;
}

async function getById(id: number): Promise<Team | null> {
  const data = await TeamModel.findByPk(id);
  return data;
}

export default {
  getAll,
  getById,
};
