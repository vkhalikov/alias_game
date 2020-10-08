import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/ui';
import './StageLayout.css';

const StageLayout = ({ title, children, allowReturn, allowContinue, goToPreviousStage, goToNextStage }) => (
  <div className="StageLayout">
    {title && (
      <h1 className="StageLayout-title">
        {title}
      </h1>
    )}

    <div className="StageLayout-view">
      {children}
    </div>

    {(goToPreviousStage || goToNextStage) && (
      <div className="StageLayout-buttons">
        {goToPreviousStage && <Button text="Назад" disabled={!allowReturn} onClick={goToPreviousStage} />}

        {goToNextStage && <Button text="Продолжить" disabled={!allowContinue} onClick={goToNextStage} />}
      </div>
    )}
  </div>
);

StageLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  allowReturn: PropTypes.bool,
  allowContinue: PropTypes.bool,
  goToPreviousStage: PropTypes.func,
  goToNextStage: PropTypes.func,
};

export default StageLayout;
