import TeamModel from "../../database/models/SequelizeTeam";

const newTeamsAll = [
  new TeamModel({ id: 1, teamName: 'Avaí/Kindermann' }),
  new TeamModel({ id: 2, teamName: 'Bahia' }),
];

const allTeams = [
  { id: 1, teamName: 'Avaí/Kindermann' },
  { id: 2, teamName: 'Bahia' },
];

const oneTeam = { id: 1, teamName: 'Avaí/Kindermann' };

export default {
  newTeamsAll,
  allTeams,
  oneTeam,
}