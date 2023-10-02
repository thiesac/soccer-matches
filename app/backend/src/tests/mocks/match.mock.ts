const arrayMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      id: 16,
      teamName: "São Paulo",
    },
    awayTeam: {
      id: 8,
      teamName: "Grêmio",
    },
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      id: 9,
      teamName: "Internacional",
    },
    awayTeam: {
      id: 14,
      teamName: "Santos",
    },
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      id: 6,
      teamName: "Ferroviária"
    },
    awayTeam: {
      id: 1,
      teamName: "Avaí/Kindermann"
    }
  },
  {
    id: 43,
    homeTeamId: 11,
    homeTeamGoals: 0,
    awayTeamId: 10,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      id: 11,
      teamName: "Napoli-SC"
    },
  }
];

const arrayFinishedMAtches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      id: 16,
      teamName: "São Paulo",
    },
    awayTeam: {
      id: 8,
      teamName: "Grêmio",
    },
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      id: 9,
      teamName: "Internacional",
    },
    awayTeam: {
      id: 14,
      teamName: "Santos",
    },
  },
]

const arrayInProgressMatches = [
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      id: 6,
      teamName: "Ferroviária"
    },
    awayTeam: {
      id: 1,
      teamName: "Avaí/Kindermann"
    }
  },
  {
    id: 43,
    homeTeamId: 11,
    homeTeamGoals: 0,
    awayTeamId: 10,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      id: 11,
      teamName: "Napoli-SC"
    },
  }
]

const newMatch = {
  homeTeamId: 16,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export default {
  arrayMatches,
  arrayInProgressMatches,
  newMatch,
}