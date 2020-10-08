import {
  CORRECT_ANSWER,
  INCORRECT_ANSWER,
  PACKS_FETCH_START,
  PACKS_FETCH_SUCCESS,
  PACKS_FETCH_FAIL,
  PACKS_SELECT,
  SET_SETTINGS,
  RESET_GAME,
  RESET_WORD_INDEX,
  SET_TEAM_NAMES,
  SET_PHASE,
  SKIP_WORD,
  FINISH_TURN,
  FINISH_GAME,
  PACKS_RESET,
  RESET_WORDS,
  SET_TRIGGER,
  RESET_TRIGGER,
  INITIALIZE_GAME,
  REMOVE_EVENT_LISTENER,
  ADD_EVENT_LISTENER,
  SAVE_TIMER,
  DELETE_TIMER,
} from '../constants/action-types/game';
import { STAGE } from '../constants/action-types/game';
import { packExample } from '../../api-client';

// Stage control
export const goToNextStage = () => {
  return { type: STAGE.TO_NEXT };
};

export const goToPreviousStage = () => {
  return { type: STAGE.TO_PREVIOUS };
};

export const setStage = (stage) => {
  return { type: STAGE.SET, payload: stage };
}

// Settings stage
export const setSettings = (settingsObject) => {
  return { type: SET_SETTINGS, payload: settingsObject };
}

// Team names stage
export const setTeamNames = (teamNames) => {
  return { type: SET_TEAM_NAMES, payload: teamNames };
}

// Pack selection stage
export const selectPack = (packId) => {
  return { type: PACKS_SELECT, payload: { packId }};
}

export const resetPack = ({ inGameRequest = false } = {}) => {
  return { type: PACKS_RESET, payload: { inGameRequest } };
}

export const fetchPacks = () => (dispatch) => {
  dispatch({ type: PACKS_FETCH_START });

  setTimeout(() => {
    dispatch({ type: PACKS_FETCH_SUCCESS, payload: { list: [packExample] } })
  }, 1500)
}

// Gameplay stage
export const resetGame = () => {
  return { type: RESET_GAME };
}

export const resetWords = (newWords) => {
  return { type: RESET_WORDS, payload: { words: newWords } };
}

export const initializeGame = (teamsNames, words) => {
  return { type: INITIALIZE_GAME, payload: { teamsNames, words }};
}

export const setPhase = (phase) => {
  return { type: SET_PHASE, payload: { phase }};
}

export const registerCorrectAnswer = (word) => {
  return { type: CORRECT_ANSWER, payload: { word } };
};

export const registerIncorrectAnswer = (word) => {
  return { type: INCORRECT_ANSWER, payload: { word } };
};

export const registerSkip = (word, isSkipPenaltyEnabled) => {
  return { type: SKIP_WORD, payload: { word, isSkipPenaltyEnabled } };
};

export const finishTurn = () => {
  return { type: FINISH_TURN };
};

export const finishGame = () => {
  return { type: FINISH_GAME };
};

export const setTrigger = (trigger) => {
  return { type: SET_TRIGGER, payload: { trigger } };
};

export const resetTrigger = (trigger) => {
  return { type: RESET_TRIGGER, payload: { trigger } };
};

// export const addEventListener = (eventName, callbackFn) => {
//   return { type: ADD_EVENT_LISTENER, payload: { eventName, callbackFn } };
// };
//
// export const removeEventListener = (eventName, callbackFn) => {
//   return { type: REMOVE_EVENT_LISTENER, payload: { eventName, callbackFn } };
// };

export const saveTimer = (timerValue) => {
  return { type: SAVE_TIMER, payload: { timerValue } };
};

export const deleteTimer = () => {
  return { type: DELETE_TIMER };
};
