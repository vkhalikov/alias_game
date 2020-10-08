import React from 'react';
import { withRouter } from 'react-router-dom';
import SplitPanel from '../../components/ui/SplitPanel';
import FillingLayout from '../../components/FillingLayout';
import GameModeCard from '../../components/GameModeCard';

import './GameModePage.css';

class GameModePage extends React.Component {
  switchPage = (url) => {
    this.props.history.push(url);
  };

  render() {
    return (
      <SplitPanel>
        <FillingLayout
          centerContent
          component={
            <GameModeCard
              text="Локальная"
              onClick={() => this.switchPage('/local')}
            />
          }
        />
        <FillingLayout
          centerContent
          component={
            <GameModeCard
              text="Онлайн"
              onClick={() => this.switchPage('/multiplayer')}
            />
          }
        />
      </SplitPanel>
    );
  }
}


export default withRouter(GameModePage);
