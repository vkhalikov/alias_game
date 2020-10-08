import { STAGE } from '../../constants/action-types/game';
import { settingsStage } from '../../constants/stages';

const stageReducer = (currentStage = settingsStage, { type, payload }) => {
  switch (type) {
    case STAGE.TO_NEXT:
      return currentStage.next || currentStage;

    case STAGE.TO_PREVIOUS:
      return currentStage.previous || currentStage;

    case STAGE.SET:
      return payload;

    default:
      return currentStage;
  }
};

export default stageReducer;