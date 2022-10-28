// NOTE: Followed CodeOp's video here: https://www.youtube.com/watch?v=HU4wdKseOks&ab_channel=CodeOpTeam
// And Jim's FiledUpload demo

var express = require("express");
var router = express.Router();
const db = require("../model/helper");
// fs and path are not in package.json as they are preinstalled with Node
var fs = require("fs"); // file system that is the library that allows you to interact with files (move, delete files etc)
var path = require("path");
const multer = require("multer")
// // "npm install uuid" to create unique filenames
// const { v4: uuidv4 } = require("uuid");
// // allows something to read mime-type of file (eg. png, jpg)
// var mime = require("mime-types");

const PUBLIC_DIR_URL = 'http://localhost:5000/clientfiles';

/**
 * Multer initialization
 **/


 const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './public/clientfiles');  // store files here
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);  // keep original filename
  }
});
const upload = multer({ storage });

/**
 * Helper functions
 **/


 async function sendAllFiles(res) {
  try {
      let results = await db('SELECT * FROM files');
      // Add 'url' property for each file
      let withUrls = results.data.map(r => ({...r, url: `${PUBLIC_DIR_URL}/${r.filename}`}));
      res.send(withUrls);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
}

// GET files 
router.get("/", function (req, res) {
  sendAllFiles(res);
});

// INSERT a new file into the DB
router.post('/', upload.single('clientfile'), async function(req, res) {
  let { clientnote } = req.body;

  try {
      // Insert DB record; only save the filename, not the entire path
      let sql = `
          INSERT INTO files (note, filename)
          VALUES ('${clientnote}', '${req.file.originalname}')
      `;
      await db(sql);

      // Send array of all files as response
      res.status(201);  // new resource created
      sendAllFiles(res);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});


// router.post("/", async (req, res) => {
//   // thanks to the fileUpload library, files are available at req.files
//   const { imagefile } = req.files;
//   console.log(imagefile);

//   // using the mime installed above, to provide the extension of the file (eg. png, jpg, gif) to construct new file name
//   var extension = mime.extension(imagefile.mimetype);
//   var filename = uuidv4() + "." + extension;

//   // want to move from temporary path, to target/end path
//   // the path that it will be stored
//   var tmp_path = imagefile.tempFilePath;
//   // construct the end path of my file, where do i want to store this
//   var target_path = path.join(__dirname, "../public/img/") + filename;

//   // then use fs (file system) to rename/move files from tmp_path to target_path
//   fs.rename(tmp_path, target_path, function (err) {
//     if (err) throw err;
//     // delete the file from original location of tmp_path
//     fs.unlink(tmp_path, function (err) {
//       if (err) throw err;

//       db(`INSERT INTO images (path) VALUES ("${filename}");`)
//       .then((results) => {
//         getImages(req, res);
//       })
//       .catch((err) => res.status(500).send(err));
//     })
//   })
// })


module.exports = router;
