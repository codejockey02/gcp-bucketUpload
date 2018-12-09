const express = require('express');
const app = express();
const multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const port 	     = process.env.PORT || 8080;
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit:'100mb'}));
bodyParser.urlencoded({extended: true, limit: '100mb'})
// Creates a client
const storage = new Storage();
var path = "./uploads/file.txt";
app.post('/compile', (req,res)=>{
  async function upload(){
    var filed = req.body.avatar;
    fs.writeFile("./uploads/file.txt", filed, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  }); 
    var tmp_path = path;
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
