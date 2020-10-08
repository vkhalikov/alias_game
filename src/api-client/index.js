class API {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(resource) {
    const resp = await fetch(`${this.baseUrl}/${resource}`);
    const body = await resp.json();

    return body;
  }
}

export const packExample = {
  id: 1,
  title: {
    en: "Top 250 movies",
    ru: "Топ 250 фильмов",
  },
  words: {
    ru: ['Побег из Шоушенка', 'Зеленая миля', 'Форрест Гамп', 'Список Шиндлера', '1+1', 'Начало', 'Леон', 'Король Лев', 'Бойцовский клуб', 'Достучаться до небес'],
    en: ['The Shawshank Redemption', 'The Green Mile', 'Forrest Gump', 'Schindler\'s List', 'Intouchables', 'Inception', 'Léon', 'The Lion King', 'Fight Club', 'Knockin\' on Heaven\'s Doo']
  }
}