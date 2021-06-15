var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET photography listing. */
router.get('/', async (req, res, next) => {
  try {
    const results = await db("SELECT * FROM topics;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }  
});

// GET one theme
router.get("/:theme_id", async (req, res, next) => {
  try {
    const results = await db(
      `select theme, description from topics where theme_id = ${req.params.theme_id};`
    );
    res.send(results.data);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
