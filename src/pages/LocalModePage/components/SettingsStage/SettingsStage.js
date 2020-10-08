import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash/util';
import { goToNextStage, setSettings } from 'redux/action-creators/game';
import { Form, FormElement, Select, Slider, Checkbox } from 'components/ui';
import { FormSchema } from 'components/ui/Form/FormSchema';
import StageLayout from '../StageLayout';
import './SettingsStage.css';


const SettingsStage = ({ settings, title, goToNextStage, setSettings, history }) => {
  const initialSettings = useMemo(() => (new FormSchema(settings)), [settings]); //TODO: Some settings, stored in userData or localStorage

  const onSubmit = (settings) => {
    setSettings(settings);
    goToNextStage();
  }

  const onCancel = () => {
    history.goBack();
  }

  return (
    <StageLayout title={title}>
      <div className="SettingsStage">
        <Form schema={initialSettings} onSubmit={onSubmit} onCancel={onCancel}>
          <FormElement
            name="teamQuantity"
            inputComponent={Select}
            options={_.range(1, 5)}
            label="Количество команд"
          />
          <FormElement
            name="turnTime"
            inputComponent={Slider}
            min={20}
            max={90}
            step={5}
            label={'Время на ход (сек)'}
          />
          <FormElement
            name="pointsToWin"
            inputComponent={Slider}
            min={20}
            max={100}
            step={5}
            label={'Очков для победы'}
          />
          <FormElement
            name="skipPenalty"
            render={({ value, onChange, name }) => (
              <Checkbox name={name}
                        label="Штраф за пропуск"
                        checked={value}
                        onChange={onChange}
                        value={name} />
            )}
          />
        </Form>
      </div>
    </StageLayout>
  );
};

SettingsStage.prtopTypes = {
  settings: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  goToNext: PropTypes.func.isRequired,
  setSettings: PropTypes.func.isRequired,
  goToNextStage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = ({ game: { settings, stage: { title } } }) => ({
  settings,
  title,
});
const mapDispatchToProps = { setSettings, goToNextStage };

export default compose(withRouter,connect(mapStateToProps, mapDispatchToProps))(SettingsStage);
