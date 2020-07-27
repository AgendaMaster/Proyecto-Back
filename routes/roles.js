const express = require('express');
const passport = require('passport');
const RolesService = require('../services/roles');
const validationHandler = require('../utils/middleware/validationHandler');
const { roleSchema } = require('../schemas/roles');
require("../utils/auth/strategies/jwt");

function rolesApi(app) {
  const router = express.Router();
  app.use('/api/roles', router);

  const rolesService = new RolesService();


  router.get('/',
    // passport.authenticate("jwt", {session:false}),
    async function (req, res, next) {
      const { tags } = req.query;
      try {
        const roles = await rolesService.getRoles({ tags });
        res.status(200).json({
        data: roles,
        message: 'roles listed',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post('/', 
    passport.authenticate("jwt", {session:false}),
    // validationHandler(roleSchema),
    async function (req, res, next) {
      const { body: role } = req;
      try {

        const result = roleSchema.validate(role)

        if (result.error) {
          res.status(400).json({
            data: null,
            message: result.error.details[0].message,
          })
        }
        const roleCreated = await rolesService.createRol({ role });
        res.status(201).json({
          data: roleCreated,
          message: 'role created',
        });
      } catch (err) {
        next(err);
      }
    }
  );


  router.get('/:roleId', async function (req, res, next) {
    const { roleId } = req.params;
    try {
      const role = await rolesService.getRol({ roleId });
      res.status(200).json({
        data: role,
        message: 'role retrieved',
      });
    } catch (err) {
      next(err);
    }
  });


  router.put('/:roleId',
    passport.authenticate("jwt", {session:false}),
    // validationHandler(roleSchema), 
    async function (req, res, next) {
      const { roleId } = req.params;
      const { body: role } = req;
      try {


        const result = roleSchema.validate(role)

        if (result.error) {
          res.status(400).json({
            data: null,
            message: result.error.details[0].message,
          })
        }
        
        const roleUpdated = await rolesService.updateRol({ roleId, role });

        res.status(200).json({
          data: roleUpdated,
          message: 'role updated',
        });

      } catch (err) {
        next(err);
      }
    }
  );


  router.delete('/:roleId',
    passport.authenticate("jwt", {session:false}),
    async function (req, res, next) {
      const { roleId } = req.params;
      try {
        const roleDeleted = await rolesService.deleteRol({ roleId });
        res.status(200).json({
          data: roleDeleted,
          message: 'role deleted',
        });
        console.log(chalk.green("Roles created"));
      } catch (err) {
        next(err);
      }
    }
  );
    
}

module.exports = rolesApi;