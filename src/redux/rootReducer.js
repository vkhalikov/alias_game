import { combineReducers } from 'redux';
import navigationFullscreen from './reducers/navigation-fullscreen';
import game from './reducers/game';

export default combineReducers({ navigationFullscreen, game });
