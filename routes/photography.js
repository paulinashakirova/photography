var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET topic listing. */
router.get('/', async (req, res, next) => {
  try {
    const results = await db("SELECT * FROM topic;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }  
});

// GET one topic
router.get("/:topic_id", async (req, res, next) => {
  try {
    const results = await db(
      `select topic_id, theme, description, image from topic where topic_id = ${req.params.topic_id};`
    );
    res.send(results.data);
  } catch (err) {
    res.status(404).send(err);
  }
});

// INSERT a new topic into the DB
router.post("/", async (req, res, next) => {
  try {
    await db(       
      `insert into topic (topic_id, theme, description, image) values ('${req.body.topic_id}', '${req.body.theme}', '${req.body.description}', '${req.body.image}');`
    );
    res.send({ msg: "Topic inserted" });
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
