'use strict';
const chalk = require(`chalk`);
const express = require(`express`);
const {HttpCode} = require(`../../constants`);
const offersRouter = require(`../routes/offers-routes`);
const mainRouter = require(`../routes/main-routes`);

const DEFAULT_PORT = 3000;

const app = express();
app.use(express.json());

app.use(`/api/`, mainRouter);
app.use(`/api/offers`, offersRouter);


app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  run(args) {
    let [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
