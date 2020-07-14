const express = require('express');
const UsersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');
const { userSchema } = require('../utils/schemas/users');

function usersApi(app) {
  const router = express.Router();
  app.use('/api/users', router);

  const usersService = new UsersService();

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;
    try {
      const users = await usersService.getUsers({ tags });
      res.status(200).json({
        data: users,
        message: 'users listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:userId', 'params', async function (req, res, next) {
    const { userId } = req.params;
    try {
      const user = await usersService.getUser({ userId });
      res.status(200).json({
        data: user,
        message: 'user retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', validationHandler(userSchema), async function (req, res, next) {
    const { body: user } = req;
    try {
      const createUserId = await usersService.createUser({ user });
      res.status(201).json({
        data: createUserId,
        message: 'user created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:userId', validationHandler(userSchema), async function (req, res, next) {
    const { userId } = req.params;
    const { body: user } = req;
    try {
      const updateUserId = await usersService.updateUser({ userId, user });
      res.status(200).json({
        data: updateUserId,
        message: 'users updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:userId', async function (req, res, next) {
    const { userId } = req.params;
    try {
      const deleteUserId = await usersService.deleteUser({ userId });
      res.status(200).json({
        data: deleteUserId,
        message: 'users deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = usersApi;
