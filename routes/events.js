const express = require('express');
const passport = require('passport');
const EventsService = require('../services/events');
const { eventSchema, updateEventSchema } = require('../schemas/events');
require("../utils/auth/strategies/jwt");

function eventsApi(app) {
  const router = express.Router();
  app.use('/api/events', router);

  const eventsService = new EventsService();

  router.get('/',
              passport.authenticate("jwt", {session:false}),
              async function (req, res, next) {
    const { tags } = req.query;
    try {
      const events = await eventsService.getEvents({ tags });
      res.status(200).json({
        data: events,
        message: 'events listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:eventId',
              passport.authenticate("jwt", {session:false}),
              async function (req, res, next) {
    const { eventId } = req.params;
    try {
      const event = await eventsService.getEvent({ eventId });
      res.status(200).json({
        data: event,
        message: 'event retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/',
                passport.authenticate("jwt", {session:false}),
                async function (req, res, next) {
    const { body: event } = req;
    let result = null

    result = eventSchema.validate(event)

    if (result.error) {
      res.status(400).json({
        data: null,
        message: result.error.details[0].message,
      });
    }else {
      try {
        const createEventId = await eventsService.createEvent({ event });
        let message = 'event created'
  
        res.status(201).json({
          data: createEventId,
          message,
        });
      } catch (err) {
        next(err);
      }
    }
  });

  router.put('/:eventId',
              passport.authenticate("jwt", {session:false}),
              async function (req, res, next) {
    const { eventId } = req.params;
    const { body: event } = req;
    let result = null

    result = updateEventSchema.validate(event)

    if (result.error) {
      res.status(400).json({
        data: null,
        message: result.error.details[0].message,
      })
    } else {
      try {
        const updateEventId = await eventsService.updateEvent({ eventId, event });
        res.status(200).json({
          data: updateEventId,
          message: 'event updated',
        });
      } catch (err) {
        next(err);
      }
    }
  });

  router.delete('/:eventId',
              passport.authenticate("jwt", {session:false}),
              async function (req, res, next) {
    const { eventId } = req.params;
    try {
      const deleteEventId = await eventsService.deleteEvent({ eventId });
      res.status(200).json({
        data: deleteEventId,
        message: 'events deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = eventsApi;
