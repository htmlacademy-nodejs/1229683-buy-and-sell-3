'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const fs = require(`fs`).promises;
const offerValidator = require(`../validators/offer-validator`);

const offersRouter = new Router();
const FILENAME = `mocks.json`;

offersRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.status(HttpCode.OK).send(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

offersRouter.post(`/`, async (req, res) => {
  try {
    offerValidator(req.body);
    res.status(HttpCode.OK).send(`Объявление успешно загружено`);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
  }
});


offersRouter.get(`/:offerId`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    const offer = mocks.filter((offerItem) => offerItem.id === req.params.offerId);
    res.status(HttpCode.OK).send(offer);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

offersRouter.put(`/:offerId`, async (req, res) => {
  try {
    offerValidator(req.body);
    res.status(HttpCode.OK).send(`Объявление успешно изменено`);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

offersRouter.delete(`/:offerId`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    const offers = mocks.filter((offerItem) => offerItem.id !== req.params.offerId);
    await fs.writeFile(FILENAME, JSON.stringify(offers));
    res.status(HttpCode.OK).send(`Объявление успешно удалено`);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

offersRouter.get(`/:offerId/comments`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    const offer = mocks.filter((offerItem) => offerItem.id === req.params.offerId).map((it) => it.comments);
    res.status(HttpCode.OK).send(offer);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

offersRouter.delete(`/:offerId/comments/:commentId`, async (req, res) => {
  try {
    res.status(HttpCode.OK).send(`Комментарий успешно удален`);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

offersRouter.post(`/:offerId/comments/`, async (req, res) => {
  try {
    if (req.body.text.length < 20) {
      throw new Error(`Длина комментария должна быть не меньше 20 символов`);
    }
    res.status(HttpCode.OK).send(`Комментарий успешно загружен`);
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).send(err.message);
  }
});

module.exports = offersRouter;
