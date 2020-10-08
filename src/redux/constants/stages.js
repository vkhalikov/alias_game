export class Stage {
  constructor(title) {
    this.title = title;
    this.previous = null;
  }

  setNext(nextStage) {
    this.next = nextStage;
    nextStage.previous = this;

    return nextStage;
  }
}

export const settingsStage = new Stage('Настройки');
export const teamNamesStage = new Stage('Сегодня играют');
export const packSelectionStage = new Stage('Выбор Набора');
export const gameplayStage = new Stage('Игра');
export const resultsStage = new Stage('Результаты');

settingsStage
  .setNext(teamNamesStage)
  .setNext(packSelectionStage)
  .setNext(gameplayStage)
  .setNext(resultsStage);