import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash/collection'
import {
  resetGame,
  initializeGame,
  resetWords,
  setPhase,
  registerCorrectAnswer,
  registerIncorrectAnswer,
  registerSkip,
  finishTurn,
  finishGame,
  setStage,
  resetPack,
  setTrigger,
  resetTrigger,
  saveTimer,
} from 'redux/action-creators/game';
import { packSelectionStage, settingsStage } from 'redux/constants/stages';
import * as PHASES from 'redux/constants/phases';
import * as TRIGGERS from 'redux/constants/triggers';
import { getPropsAfterInitialisation, getPropsBeforeInitialisation } from 'redux/selectors/game';
import StageLayout from '../StageLayout';
import { PlayableCard, Timer } from 'components';
import { Button } from 'components/ui';
import './GameplayStage.css';

class GameplayStage extends React.Component {
  constructor(props) {
    super(props);

    this.loadTimer();
  }

  loadTimer = () => {
    this.timer = parseInt(this.props.savedTimer || this.props.settings.turnTime, 10);
  };

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.timer -= 1;

      if (this.timer === 0) {
        this.finishTurn();
      }
    }, 1000);
  }

  resetTimer = () => {
    clearInterval(this.timerId);
    this.timer = this.props.settings.turnTime;
  };

  timerId = null;

  componentDidMount() {
    const { phase, currentWord, triggers, setPhase, resetWords, resetTrigger } = this.props;

    if (phase === PHASES.UNINITIALISED) {
      return this.initializeGame();
    }

    if (triggers[TRIGGERS.PACK_RESET_REQUESTED]) {
      resetWords(this.getShuffledWords());
      resetTrigger(TRIGGERS.PACK_RESET_REQUESTED);

      return;
    }

    if (!currentWord && phase !== PHASES.FINISHED && phase !== PHASES.NO_WORDS_LEFT) {
      setPhase(PHASES.NO_WORDS_LEFT);
    }

    if (phase === PHASES.TURN) {
      this.startTimer();
    }
  }

  componentDidUpdate() {
    const { currentWord, phase, triggers, setPhase, setTrigger, resetTrigger } = this.props;

    if (!currentWord && phase !== PHASES.FINISHED && phase !== PHASES.NO_WORDS_LEFT) {
      setPhase(PHASES.NO_WORDS_LEFT);
    }

    if (this.checkIfWinConditionIsFulfilled() && !triggers[TRIGGERS.FINAL_ROUND]) {
      setTrigger(TRIGGERS.FINAL_ROUND);
    } else if (triggers[TRIGGERS.FINAL_ROUND] && !this.checkIfWinConditionIsFulfilled()) {
      resetTrigger(TRIGGERS.FINAL_ROUND);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);

    if (this.timer) {
      this.props.saveTimer(this.timer);
    }
  }

  getShuffledWords = () => _.shuffle(this.props.pack.words.ru);

  initializeGame = () => {
    const { teamNames, initializeGame } = this.props;

    initializeGame(teamNames, this.getShuffledWords());
  }

  resetGame = () => {
    this.props.resetPack();
    this.props.resetGame();
  }

  startGame = () => {
    this.props.setPhase(PHASES.WAITING);
  }

  startTurn = () => {
    const { setPhase } = this.props;

    setPhase(PHASES.TURN);

    this.startTimer();
  };

  finishTurn = () => {
    this.props.finishTurn();

    this.resetTimer();

    if (this.props.triggers[TRIGGERS.FINAL_ROUND]) {
      this.finishGame();
    }
  };

  checkIfWinConditionIsFulfilled = () => {
    const { settings, teams } = this.props;

    return teams.some(({ score }) => score >= settings.pointsToWin);
  }

  finishGame = () => {
    this.props.finishGame();
  }

  startNewGame = () => {
    this.props.setStage(packSelectionStage);

    this.resetGame();
  }

  goToSettings = () => {
    this.props.setStage(settingsStage);

    this.resetGame();
  }

  continueWithNewPack = () => {
    this.props.resetPack({ inGameRequest: true });
    this.props.setStage(packSelectionStage);

    this.props.setTrigger(TRIGGERS.PACK_RESET_REQUESTED);

    this.props.setPhase(PHASES.TURN);
  }

  onCorrectAnswer = () => {
    this.props.registerCorrectAnswer(this.props.currentWord);
  }

  onIncorrectAnswer = () => {
    this.props.registerIncorrectAnswer(this.props.currentWord);
  }

  onSkip = () => {
    this.props.registerSkip(this.props.currentWord, this.props.settings.skipPenalty);
  }

  renderTitle() {
    const { pack, phase, currentTeam } = this.props;

    switch (phase) {
      case PHASES.START:
        return pack.title.ru;

      case PHASES.WAITING:
        return `Играют "${currentTeam.name}"`;

      case PHASES.INTERMEDIATE_RESULTS:
        return 'Промежуточные результаты';

      case PHASES.FINISHED:
        return 'Результаты игры';

      default:
        return null;
    }
  }

  renderContent() {
    const { currentWord, phase, settings, teams, currentRound } = this.props;

    switch (phase) {
      case PHASES.START:
        return (
          <div className="GameplayStage-startPhase">
            <h1>Играющие команды</h1>
            {teams.map(({ name }) => (
              <h3>{name}</h3>
            ))}
            <Button text="Начать" onClick={this.startGame} />
          </div>
        );

      case PHASES.WAITING:
        return (
          <div className="GameplayStage-waitingPhase">
            <Button text="Начать" onClick={this.startTurn} />
          </div>
        );

      case PHASES.TURN:
        return (
          <>
            <PlayableCard
              text={currentWord}
              onCorrectAnswer={this.onCorrectAnswer}
              onIncorrectAnswer={this.onIncorrectAnswer}
              onSkip={this.onSkip}
            />

            <Timer value={this.timer} />
            <Button text="ФиниША" onClick={this.finishTurn} />
          </>
        );

      case PHASES.INTERMEDIATE_RESULTS:
        return (
          <div className="GameplayStage-resultsPhase">
            {`Раунд ${currentRound}`}
            {teams.map(({ name, score, answers }) => {
              return (
                <div>
                  <span>{name}: </span>
                  <span>{score}</span>
                </div>
              );
            })}

            <Button text="Продолжить" onClick={this.startGame} />
          </div>
        );

      case PHASES.NO_WORDS_LEFT:
        return (
          <>
            <h2>Упс, похоже, слова закончились.</h2>
            <p>Продолжить игру с другим набором или подсчитать результаты?</p>

            <Button text="Продолжить" onClick={this.continueWithNewPack} />
            <Button text="К результатам!" onClick={this.finishGame} />
          </>
        );

      case PHASES.FINISHED:
        return (
          <>
            {teams.map(({ score, name, answers }) => {

              return (
                <div>
                  <span>{name}: </span>
                  <span>{score}</span>
                </div>
              );
            })}

            <Button text="Играть снова" onClick={this.startNewGame} />
            <Button text="Изменить настройки" onClick={this.goToSettings} />
          </>
        );

      default:
        return null;
    }
  }

  render() {
    const { phase } = this.props;

    if (phase === PHASES.UNINITIALISED) {
      return null;
    }

    return (
      <StageLayout title={this.renderTitle()}>
        <div className="GameplayStage">
          {this.renderContent()}
        </div>
      </StageLayout>
    );
  }
}

GameplayStage.prtopTypes = {
  settings: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  goToNext: PropTypes.func.isRequired,
  initializeGame: PropTypes.func.isRequired,
  setPhase: PropTypes.func.isRequired,
  goToNextStage: PropTypes.func.isRequired,
}

const mapStateToProps = ({ game }) => {
  const { phase } = game.gameData;

  if (phase === PHASES.UNINITIALISED) {
    return getPropsBeforeInitialisation(game);
  }

  return getPropsAfterInitialisation(game);
};

const mapDispatchToProps = {
  resetGame,
  initializeGame,
  resetWords,
  setPhase,
  registerCorrectAnswer,
  registerIncorrectAnswer,
  registerSkip,
  finishTurn,
  finishGame,
  setStage,
  resetPack,
  setTrigger,
  resetTrigger,
  saveTimer,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameplayStage);
