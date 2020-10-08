import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash/util';
import { Form, FormElement, TextInput } from 'components/ui';
import StageLayout from '../StageLayout';
import { goToPreviousStage, goToNextStage, setTeamNames } from 'redux/action-creators/game';
import { FormSchema } from 'components/ui/Form/FormSchema';
import { required } from 'utils/validators';
import './TeamNamesStage.css';

const getNameKey = (num) => `team${num}`;

const TeamNamesStage = ({ teamQuantity, title, setTeamNames, goToPreviousStage,  goToNextStage }) => {
  const schema = useMemo(() => {
    const initSchema = {};

    _.range(1, teamQuantity + 1).forEach((num) => {
      initSchema[getNameKey(num)] = { defaultValue: `Команда ${num}`, validators: [ required ]};
    });

    return new FormSchema(initSchema);
  }, [teamQuantity]);

  const onSubmit = (teamNames) => {
    setTeamNames(Object.values(teamNames));
    goToNextStage();
  };

  return (
    <StageLayout title={title}>
      <Form schema={schema}
            onCancel={goToPreviousStage}
            cancelText="К настройкам"
            submitText="Продолжить"
            onSubmit={onSubmit}>
        {
          _.range(1, teamQuantity + 1).map((num) => (
            <FormElement key={num} name={getNameKey(num)} inputComponent={TextInput} stretch />
          ))
        }
      </Form>
    </StageLayout>
  );
};

TeamNamesStage.propTypes = {
  teamQuantity: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  setTeamNames: PropTypes.func.isRequired,
  goToPreviousStage: PropTypes.func.isRequired,
  goToNextStage: PropTypes.func.isRequired,
};

const mapStateToProps = ({ game: { settings: { teamQuantity }, stage: { title } } }) => ({
  teamQuantity,
  title,
});
const mapDispatchToProps = { setTeamNames, goToPreviousStage,  goToNextStage };

export default connect(mapStateToProps, mapDispatchToProps)(TeamNamesStage);
