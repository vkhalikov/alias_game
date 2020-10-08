import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  settingsStage,
  packSelectionStage,
  gameplayStage,
  teamNamesStage,
  resultsStage,
  Stage
} from 'redux/constants/stages';
import { SettingsStage, TeamNamesStage, PackSelectionStage, GameplayStage } from '../../components';
import './StageContainer.css';

const StageContainer = ({ stage }) => {
  switch (stage) {
    case settingsStage:
      return <SettingsStage />

    case teamNamesStage:
      return <TeamNamesStage />

    case packSelectionStage:
      return <PackSelectionStage />

    case gameplayStage:
      return <GameplayStage />

    default: throw new Error('Stage is not specified');
  }
};

StageContainer.propTypes = {
  stage: PropTypes.instanceOf(Stage).isRequired,
};

const mapStateToProps = ({ game: { stage } }) => ({ stage });

export default connect(mapStateToProps, null)(StageContainer);
