import { OPEN_NAVIGATION, CLOSE_NAVIGATION } from '../constants/action-types/navigation-fullscreen';

export const open = () => ({ type: OPEN_NAVIGATION });
export const close = () => ({ type: CLOSE_NAVIGATION });
