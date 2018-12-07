const express = require('express');
const app = express();
const multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const port 	     = process.env.PORT || 8080;

// Creates a client
const storage = new Storage();
const storage1 = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
      }
});
const upload = multer({ storage: storage1})

app.post('/compile',upload.single('avatar'), (req,res)=>{
    // const file = req.body.code;
    async function upload(){
    var tmp_path = req.file.path;
    var file_name = req.file.originalname;
    const bucketName = 'gcp-demo02071998';
    const filename = tmp_path;
    await storage.bucket(bucketName).upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        metadata: {
          // Enable long-lived HTTP caching headers
          // Use only if the contents of the file will never change
          // (If the contents will change, use cacheControl: 'no-cache')
          cacheControl: 'public, max-age=31536000',
        },
      });
      
      console.log(`${filename} uploaded to ${bucketName}.`);
      res.json({message:"Submitted"});
    }upload();
});
app.listen(port);

console.log(`App Runs on ${port}`);
/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const bucketName = 'gcp-demo02071998';
// const filename = 'avatar';

// Uploads a local file to the bucket
