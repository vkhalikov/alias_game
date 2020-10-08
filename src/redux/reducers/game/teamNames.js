import { SET_TEAM_NAMES } from '../../constants/action-types/game';

const settingsReducer = (settings = [], { type, payload }) => {
  switch (type) {
    case SET_TEAM_NAMES:
      return payload;

    default:
      return settings;
  }
};

export default settingsReducer;