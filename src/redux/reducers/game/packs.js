import {
  PACKS_SELECT,
  PACKS_FETCH_START,
  PACKS_FETCH_FAIL,
  PACKS_FETCH_SUCCESS,
  PACKS_RESET,
} from '../../constants/action-types/game';

const initialState = {
  list: [],
  selectedPack: null,
  gotInGameResetRequest: null,
  loading: false,
  error: null,
}

const packsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PACKS_SELECT:
      return { ...state, selectedPack: state.list.find(({ id }) => id === payload.packId) };

    case PACKS_RESET:
      return { ...state, selectedPack: null, gotInGameResetRequest: payload.inGameRequest };

    case PACKS_FETCH_START:
      return { ...state, loading: true };

    case PACKS_FETCH_SUCCESS:
      return { ...state, list: payload.list, loading: false };

    case PACKS_FETCH_FAIL:
      return { ...state, loading: false, error: payload.error };

    default:
      return state;
  }
};

export default packsReducer;
