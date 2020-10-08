export const getPropsBeforeInitialisation = (gameState) => {
  const {
    teamNames,
    gameData: { phase },
    settings,
    packs: { selectedPack },
  } = gameState;

  return {
    phase,
    settings,
    teamNames,
    pack: selectedPack,
  };
};

export const getPropsAfterInitialisation = (gameState) => {
  const {
    settings,
    gameData: { phase, teams, words, currentTeamIndex, currentWordIndex, currentRound, triggers,savedTimer },
    packs: { selectedPack },
  } = gameState;

  return {
    phase,
    settings,
    teams,
    currentRound,
    triggers,
    savedTimer,
    pack: selectedPack,
    currentTeam: teams[currentTeamIndex],
    currentWord: words[currentWordIndex],
  };
};
