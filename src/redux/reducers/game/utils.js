export const updateTeam = (teams, teamIndex, newTeamData) => [...teams.slice(0, teamIndex), newTeamData, ...teams.slice(teamIndex + 1)];

export const calculateNewScore = (currentScore, typeOfAnswer, isSkipPenaltyEnabled) => {
  switch (typeOfAnswer) {
    case 'correct':
      return currentScore + 1;

    case 'incorrect':
      return currentScore;

    case 'skipped':
      return isSkipPenaltyEnabled ? (currentScore - 1) : currentScore;

    default:
      throw new Error(`Wrong type of answer: ${typeOfAnswer}`);
  }
};

export const calculateNextTeamIndex = (prevIndex, teamsQuantity) => {
  const nextIndex = prevIndex + 1;

  return (nextIndex === teamsQuantity) ? 0 : nextIndex;
};

export const calculateCurrentRound = (prevRound, nextTeamIndex) => (nextTeamIndex === 0) ? prevRound + 1 : prevRound;

export const collectStats = (teams, teamIndex, wordsLastTurn) => {
  const prevTeam = teams[teamIndex];

  const prevAnswers = prevTeam.answers;
  const updatedAnswers = {
    correct: [...prevAnswers.correct, ...wordsLastTurn.correct],
    incorrect: [...prevAnswers.incorrect, ...wordsLastTurn.incorrect],
    skipped: [...prevAnswers.skipped, ...wordsLastTurn.skipped],
  };

  return {
    teams: updateTeam(teams, teamIndex, { ...prevTeam, answers: updatedAnswers }),
  };
};