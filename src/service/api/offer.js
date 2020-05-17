'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const offerValidator = require(`../middlewares/offer-validator`);
const commentValidator = require(`../middlewares/comment-validator`);
const offerExists = require(`../middlewares/offer-exists`);

const route = new Router();

module.exports = (app, offerService, commentService) => {
  app.use(`offers`, route);

  route.get(`/`, (req, res) => {
    const offers = offerService.findAll();
    res.status(HttpCode.OK).send(offers);
  });

  route.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      res.status(HttpCode.NOT_FOUND)
      .send(`Not found ${offerId}`);
    }

    res.status(HttpCode.OK).send(offer);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);

    res.status(HttpCode.CREATED).send(offer);
  });

  route.put(`/:offerId`, offerValidator, (req, res) => {
    const {offerId} = req.params;
    const existsOffer = offerService.findOne(offerId);

    if (!existsOffer) {
      res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    const updatedOffer = offerService.update(existsOffer);
    res.status(HttpCode.OK).send(updatedOffer);
  });

  route.delete(`:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.drop(offerId);

    if (!offer) {
      res.status(HttpCode.NOT_FOUND).send(`Offer ${offerId} not found`);
    }

    res.status(HttpCode.OK).send(offer);
  });

  route.get(`:offerId/comments`, offerExists(offerService), (req, res)=> {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    res.status(HttpCode.OK).send(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.drop(offer, commentId);

    if (!deletedComment) {
      res.status(HttpCode.NOT_FOUND).send(`Comment not found`);
    }

    res.status(HttpCode.OK).send(deletedComment);
  });

  route.post(`/:offerId/comments`, [offerExists(offerService), commentValidator], (req, res) => {
    const {offer} = res.locals;
    const comment = commentService.create(offer, req.body);

    res.status(HttpCode.CREATED).send(comment);
  });

};
