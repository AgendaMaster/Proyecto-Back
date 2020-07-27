const express = require('express');

const upload = require("../services/images");
const singleUpload = upload.single("image");
const validationHandler = require('../utils/middleware/validationHandler');

require("../utils/auth/strategies/jwt");

function imagesApi(app) {

    const router = express.Router();
    app.use('/api/images', router);

    router.post("/", function (req, res) {
        singleUpload(req, res, function (err) {
          if (err) {
            return res.json({
              success: false,
              errors: {
                title: "Image Upload Error",
                detail: err.message,
                error: err,
              },
            });
          }
          let update = { profilePicture: req.file.location };
          res.status(201).json({
              message: update
          })
        });
      });
 
}

module.exports = imagesApi;
