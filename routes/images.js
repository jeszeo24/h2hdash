// NOTE: Followed CodeOp's video here: https://www.youtube.com/watch?v=HU4wdKseOks&ab_channel=CodeOpTeam


var express = require("express");
var router = express.Router();
const db = require("../model/helper");
// fs and path are not in package.json as they are preinstalled with Node
var fs = require("fs"); // file system that is the library that allows you to interact with files (move, delete files etc)
var path = require("path");
// "npm install uuid" to create unique filenames
const { v4: uuidv4 } = require("uuid");
// allows something to read mime-type of file (eg. png, jpg)
var mime = require("mime-types");

// GET image list
// image: based off app.js, link is /images
router.get("/", function (req, res, next) {
  db("SELECT * FROM images;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// GET one image
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM images WHERE id = ${id}`;

  try {
    let result = await db(sql);
    let images = result.data;

    // if image not found, send error message
    if (images.length === 0) {
      res.status(404).send({ error: "image not found" });
    } else {
      // [0] to access array and only return object
      res.send(images[0]);
    }
  } catch (err) {
    // internal server error
    res.status(500).send({ error: err.message });
  }
});

// INSERT a new image into the DB
router.post("/", async (req, res) => {
  // thanks to the fileUpload library, files are available at req.files
  const { imagefile } = req.files;
  console.log(imagefile);

  // using the mime installed above, to provide the extension of the file (eg. png, jpg, gif) to construct new file name
  var extension = mime.extension(imagefile.mimetype);
  var filename = uuidv4() + "." + extension;

  // want to move from temporary path, to target/end path
  // the path that it will be stored
  var tmp_path = imagefile.tempFilePath;
  // construct the end path of my file, where do i want to store this
  var target_path = path.join(__dirname, "../public/img/") + filename;

  // then use fs (file system) to rename/move files from tmp_path to target_path
  fs.rename(tmp_path, target_path, function (err) {
    if (err) throw err;
    // delete the file from original location of tmp_path
    fs.unlink(tmp_path, function (err) {
      if (err) throw err;

      db(`INSERT INTO images (path) VALUES ("${filename}");`)
      .then((results) => {
        getImages(req, res);
      })
      .catch((err) => res.status(500).send(err));
    })
  })
})

// // DELETE a image from the DB
// router.delete("/:id", async (req, res) => {
//   let id = req.params.id;

//   try {
//     let result = await db(`SELECT * FROM images where id = ${id}`);
//     if (result.data.length === 0) {
//       res.status(404).send({ error: "image not found" });
//     } else {
//       let sql = `DELETE FROM images WHERE id = ${id}`;

//       await db(sql);

//       let result = await db("SELECT * FROM images");
//       // need to request all items, if not will return deleted object
//       let images = result.data;
//       res.send(images); // return updated array
//     }
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

module.exports = router;
