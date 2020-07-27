const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require( 'path' );
const s3 = new aws.S3();

aws.config.update({
  secretAccessKey: 'n96MC7iG0Tfvmn3OmFnNayoUD0YaK3BVK42CVRZL',
  accessKeyId: 'AKIAJIITIH6IVPEMHWLQ',
  Bucket: 'agendamaster'
});

const upload = multer({
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket:'agendamaster',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
        cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
    },
  }),
});

module.exports = upload;