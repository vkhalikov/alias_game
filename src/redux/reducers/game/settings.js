import { SET_SETTINGS } from '../../constants/action-types/game';

const initialSettings = {
  teamQuantity: 2,
  turnTime: 60,
  pointsToWin: 30,
  skipPenalty: false,
};

const settingsReducer = (settings = initialSettings, { type, payload }) => {
  switch (type) {
    case SET_SETTINGS:
      return payload;

    default:
      return settings;
  }
};

export default settingsReducer;