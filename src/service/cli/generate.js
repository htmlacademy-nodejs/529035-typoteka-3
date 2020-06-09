'use strict';

const DATA_CATEGORIES_PATH = `../data/categories.txt`;
const DATA_TITLES_PATH = `../data/titles.txt`;
const DATA_SENTENCES_PATH = `../data/sentences.txt`;
const DATA_COMMENTS_PATH = `../data/comments.txt`;

const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const fs = require(`fs`).promises;
const {
  getRandomInt,
  shuffle,
  getRandomArray,
} = require(`../../utils`);

const {EXIT_CODE, MAX_ID_LENGTH} = require(`../../constants`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const MAX_COMMENTS = 5;
const FILE_NAME = `../mocks.json`;

const readDataFile = async (pathFile) => {
  try {
    const dataFromFile = await fs.readFile(pathFile, `utf8`);
    return dataFromFile.trim().split(`\n`);
  } catch (err) {
    console.log(chalk.red(`Файл данных невозможно прочитать`, err));
    return [];
  }
};


const getRandomDate = () => {
  const endTime = new Date();
  const startTime = new Date().setMonth((endTime.getMonth() - 3));
  const randomDate = new Date(startTime + Math.random() * (endTime.getTime() - startTime));

  return randomDate.getFullYear() + `-` + (`0` + (randomDate.getMonth() + 1)).slice(-2) + `-` + (`0` + randomDate.getDate()).slice(-2) + ` ` + (`0` + randomDate.getHours()).slice(-2) + `:` + (`0` + randomDate.getMinutes()).slice(-2) + `:` + (`0` + randomDate.getSeconds()).slice(-2);
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments).slice(0, getRandomInt(1, 4)).join(` `),
  }))
);

const generateOffers = (count, titles, categories, sentences, comments) => {

  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getRandomDate(),
    announce: shuffle(sentences).slice(1, 5).join(` `),
    fullText: shuffle(sentences).slice(0, 8).join(` `),
    categories: getRandomArray(categories),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments)
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const titles = await readDataFile(DATA_TITLES_PATH);
    const categories = await readDataFile(DATA_CATEGORIES_PATH);
    const sentences = await readDataFile(DATA_SENTENCES_PATH);
    const comments = await readDataFile(DATA_COMMENTS_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_COUNT) {
      console.log(chalk.red(`Не более ${MAX_COUNT} файлов!`));
      process.exit(EXIT_CODE.error);
    }

    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences, comments));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Файл записан`));
    } catch (err) {
      console.log(chalk.red(`Ошибка, файл не записан`));
      process.exit(EXIT_CODE.error);
    }

  }
};
