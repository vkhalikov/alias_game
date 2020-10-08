import { combineReducers } from 'redux';
import stage from './stage';
import settings from './settings';
import teamNames from './teamNames';
import packs from './packs';
import gameData from './gameData';

const rootGameReducer = combineReducers({ stage, settings, teamNames, packs, gameData });

export default rootGameReducer;
