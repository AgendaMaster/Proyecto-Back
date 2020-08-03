const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const api = express.Router();
const EventsService = require('../services/events')

const eventsService = new EventsService();

const { config } = require("../config");

// Basic strategy
require("../utils/auth/strategies/basic");

api.post("/token", async function(req, res, next) {

  passport.authenticate("basic", async function(error, user) {
    try {
      if (error || !user) {
        next(boom.unauthorized());
      }

      req.login(user, { session: false }, async function(error) {
        if (error) {
          next(error);
        }
        
        const payload = { sub: user._id, email: user.email };
        const token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: "30m"
        });
        
        const suggestions = await eventsService.getSuggestions()

        return res.status(200).json(
          { 
            access_token: token,
            user: user,
            suggestions: suggestions
          }
        );
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

module.exports = api;