import { OPEN_NAVIGATION, CLOSE_NAVIGATION } from '../constants/action-types/navigation-fullscreen';

const initialState = {
  isOpen: false,
};

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case OPEN_NAVIGATION:
      return { isOpen: true };
    case CLOSE_NAVIGATION:
      return { isOpen: false };
    default:
      return state;
  }
};

export default reducer;