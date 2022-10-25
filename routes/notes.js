var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET note list
// NOTE: based off app.js, link is /notes
router.get("/", function (req, res, next) {
  db("SELECT * FROM notes;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// GET one note
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM notes WHERE id = ${id}`;

  try {
    let result = await db(sql);
    let notes = result.data;

    // if note not found, send error message
    if (notes.length === 0) {
      res.status(404).send({ error: "note not found" });
    } else {
      // [0] to access array and only return object
      res.send(notes[0]);
    }
  } catch (err) {
    // internal server error
    res.status(500).send({ error: err.message });
  }
});

// INSERT a new note into the DB
router.post("/", async (req, res) => {
  // The info is available in req.body
  let { text, date } = req.body;
  let sql = `
  INSERT INTO notes (text, date)
  VALUES ("${text}", "${date}")
  `;

  try {
    await db(sql); // inserts new note

    // NOTE: No check for 404 because just inserting

    // Return updated list of notes
    let result = await db("SELECT * FROM notes");
    // If query successful, send back full list of notes including new inserted note
    res.status(201).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE a note from the DB
router.delete("/:id", async (req, res) => {
  let id = req.params.id;

  try {
    let result = await db(`SELECT * FROM notes where id = ${id}`);
    if (result.data.length === 0) {
      res.status(404).send({ error: "note not found" });
    } else {
      let sql = `DELETE FROM notes WHERE id = ${id}`;

      await db(sql);

      let result = await db("SELECT * FROM notes");
      // need to request all items, if not will return deleted object
      let notes = result.data;
      res.send(notes); // return updated array
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
