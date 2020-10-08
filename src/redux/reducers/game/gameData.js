import {
  RESET_GAME,
  SET_PHASE,
  CORRECT_ANSWER,
  INCORRECT_ANSWER,
  SKIP_WORD,
  FINISH_TURN,
  FINISH_GAME,
  RESET_WORDS,
  SET_TRIGGER,
  RESET_TRIGGER,
  INITIALIZE_GAME,
  // ADD_EVENT_LISTENER,
  // REMOVE_EVENT_LISTENER,
  SAVE_TIMER,
} from '../../constants/action-types/game';
import { updateTeam, collectStats, calculateCurrentRound, calculateNewScore, calculateNextTeamIndex } from './utils';
// import { validateEventListener, getEventListenersCleanState } from './modules/events';
import * as PHASES from 'redux/constants/phases';
import * as TRIGGERS from 'redux/constants/triggers';


const initialState = {
  phase: PHASES.UNINITIALISED,
}

const cleanWordsState = {
  correct: [],
  incorrect: [],
  skipped: [],
};

const getStateAfterReset = () => initialState;

const getStateAfterInitialisation = (prevState, { teamsNames, words }) => {
  return {
    teams: teamsNames.map((name) => ({
      name,
      score: 0,
      answers: {
        correct: [],
        incorrect: [],
        skipped: [],
      },
    })),
    words,
    currentWordIndex: 0,
    currentTeamIndex: 0,
    currentRound: 1,
    phase: PHASES.START,
    wordsThisTurn: cleanWordsState,
    savedTimer: null,
    // eventListeners: getEventListenersCleanState(),
    triggers: {
      [TRIGGERS.PACK_RESET_REQUESTED]: false,
      [TRIGGERS.FINAL_ROUND]: false,
    },
  }
};

const getStateAfterWordsReset = (prevState, { words }) => ({ ...prevState, words, currentWordIndex: 0 });

const getStateAfterPhaseSetting = (prevState, { phase }) => ({ ...prevState, phase });

const getStateAfterAnswerFactory = (typeOfAnswer) => (prevState, { word, isSkipPenaltyEnabled = false }) => {
  const { teams, wordsThisTurn, currentTeamIndex, currentWordIndex } = prevState;

  const currentTeam = teams[currentTeamIndex];
  const newScore = calculateNewScore(currentTeam.score, typeOfAnswer, isSkipPenaltyEnabled);

  return {
    ...prevState,
    teams: updateTeam(teams, currentTeamIndex, { ...currentTeam, score: newScore }),
    wordsThisTurn: {
      ...wordsThisTurn,
      [typeOfAnswer]: [wordsThisTurn[typeOfAnswer], word],
    },
    currentWordIndex: currentWordIndex + 1,
  };
};
const getStateAfterCorrectAnswer = getStateAfterAnswerFactory('correct');
const getStateAfterIncorrectAnswer = getStateAfterAnswerFactory('incorrect');
const getStateAfterSkip = getStateAfterAnswerFactory('skipped');

const getStateAfterTurnFinish = (prevState) => {
  const { teams, wordsThisTurn: wordsLastTurn, currentTeamIndex: prevTeamIndex, currentRound: prevRound } = prevState;

  const nextTeamIndex = calculateNextTeamIndex(prevTeamIndex, teams.length);

  return {
    ...prevState,
    ...collectStats(teams, prevTeamIndex, wordsLastTurn),
    phase: PHASES.INTERMEDIATE_RESULTS,
    wordsThisTurn: cleanWordsState,
    currentTeamIndex: nextTeamIndex,
    currentRound: calculateCurrentRound(prevRound, nextTeamIndex),
  };
};

const getStateAfterGameFinish = (prevState) => {
  const { teams, wordsThisTurn: wordsLastTurn, currentTeamIndex: prevTeamIndex } = prevState;

  return {
    ...prevState,
    ...collectStats(teams, prevTeamIndex, wordsLastTurn),
    phase: PHASES.FINISHED,
  };
};

// const getStateAfterAddingEventListener = (prevState, { eventName, callbackFn }) => {
//   validateEventListener(eventName, callbackFn);
//
//   const currentEventListeners = prevState.eventListeners[eventName];
//
//   return { ...prevState, eventListeners: { ...prevState.eventListeners, [eventName]: [...currentEventListeners, callbackFn] } };
// };
//
// const getStateAfterRemovingEventListener = (prevState, { eventName, callbackFn }) => {
//   validateEventListener(eventName, callbackFn);
//
//   const currentEventListeners = prevState.eventListeners[eventName];
//
//   const filteredEventListeners = currentEventListeners.filter((listener) => {
//     return listener !== callbackFn;
//   });
//
//   return { ...prevState, eventListeners: { ...prevState.eventListeners, [eventName]: filteredEventListeners } };
// };

const getStateAfterTriggerActivation = (prevState, { trigger }) => {
  return { ...prevState, triggers: { ...prevState.triggers, [trigger]: true } };
};

const getStateAfterTriggerDeactivation = (prevState, { trigger }) => {
  return { ...prevState, triggers: { ...prevState.triggers, [trigger]: false } };
};

const getStateAfterTimerSaving = (prevState, { timerValue }) => {
  return { ...prevState, savedTimer: timerValue };
};

const handlers = {
  [RESET_GAME]: getStateAfterReset,
  [RESET_WORDS]: getStateAfterWordsReset,
  [INITIALIZE_GAME]: getStateAfterInitialisation,
  [SET_PHASE]: getStateAfterPhaseSetting,
  [CORRECT_ANSWER]: getStateAfterCorrectAnswer,
  [INCORRECT_ANSWER]: getStateAfterIncorrectAnswer,
  [SKIP_WORD]: getStateAfterSkip,
  [FINISH_TURN]: getStateAfterTurnFinish,
  [FINISH_GAME]: getStateAfterGameFinish,
  // [ADD_EVENT_LISTENER]: getStateAfterAddingEventListener,
  // [REMOVE_EVENT_LISTENER]: getStateAfterRemovingEventListener,
  [SET_TRIGGER]: getStateAfterTriggerActivation,
  [RESET_TRIGGER]: getStateAfterTriggerDeactivation,
  [SAVE_TIMER]: getStateAfterTimerSaving,
};

const gameDataReducer = (state = initialState, { type, payload }) => {
  if (handlers[type]) {
    return handlers[type](state, payload);
  }

  return state;
};

export default gameDataReducer;
