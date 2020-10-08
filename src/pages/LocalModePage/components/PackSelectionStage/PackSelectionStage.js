import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  { selectPack, fetchPacks, goToPreviousStage, goToNextStage } from 'redux/action-creators/game';
import StageLayout from '../StageLayout';
import { Loader, Button } from 'components/ui';
import Card from 'components/Card';
import './PackSelectionStage.css';

const PackSelectionStage = ({
  packList,
  isPackSelected,
  selectedPack,
  selectPack,
  fetchPacks,
  gotInGameResetRequest,
  loading,
  title,
  goToPreviousStage,
  goToNextStage,
}) => {
  useEffect(() => {
    if (packList.length === 0) {
      fetchPacks();
    }
  });

  return (
    <StageLayout title={title} allowReturn={!gotInGameResetRequest} allowContinue={isPackSelected} goToPreviousStage={goToPreviousStage} goToNextStage={goToNextStage}>
      {loading ? (
        <Loader centered />
        ) : (
        <div className="PackSelectionStage">
          {packList.map((p) => {
            return (
              <Button kind="nostyle" onClick={() => selectPack(p.id)} key={p.id}>
                <Card>{ p.title.ru }</Card>
              </Button>
            );
          })}
        </div>
      )}
    </StageLayout>
  );
};

PackSelectionStage.propTypes = {
  packList: PropTypes.array.isRequired,
  isPackSelected: PropTypes.bool.isRequired,
  selectedPack: PropTypes.object,
  selectPack: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  goToPreviousStage: PropTypes.func.isRequired,
  goToNextStage: PropTypes.func.isRequired,
}

const mapStateToProps = ({ game: { stage: { title }, packs: { list, selectedPack, loading, gotInGameResetRequest } } }) => ({
  loading,
  title,
  gotInGameResetRequest,
  packList: list,
  isPackSelected: !!selectedPack,
  selectedPack: selectedPack,
});
const mapDispatchToProps = { selectPack, fetchPacks, goToPreviousStage, goToNextStage };

export default connect(mapStateToProps, mapDispatchToProps)(PackSelectionStage);
