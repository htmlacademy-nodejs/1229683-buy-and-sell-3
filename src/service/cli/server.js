'use strict';
const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {HttpCode} = require(`../../constants`);
const {sendResponse} = require(`../../utils`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;


const onClientConnect = async (request, response) => {
  const notFoundMessageText = `Not found`;
  switch (request.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(` `);
        sendResponse(response, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(response, HttpCode.NOT_FOUND, notFoundMessageText);
      }
      break;

    default:
      sendResponse(response, HttpCode.NOT_FOUND, notFoundMessageText);
      break;

  }
};


module.exports = {
  name: `--server`,
  run(args) {
    let [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
    .listen(port)
    .on(`listening`, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании сервера`, err));
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
