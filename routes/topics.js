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
      `insert into topic (theme, description, image) values ('${req.body.theme}', '${req.body.description}', '${req.body.image}');`
    );
    res.send({ msg: "Topic inserted" });
  } catch (err) {
    res.status(404).send(err);
  }
});

//Delete a topic 
router.delete("/:topic_id", async (req, res) => {
try{
  await db(
    `delete from topic where topic_id = ${req.params.topic_id};`);
    res.send({ msg: "Topic deleted" });
} catch (err) {
  res.status(404).send(err);
}  
});

/* GET photo listing. */
router.get('/:topic_id/photos', async (req, res, next) => {
  try {
    const results = await db(`SELECT * FROM photo where topic_id = ${req.params.topic_id};`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }  
});

// INSERT a new photo into topic
// router.post("/:topic_id/photos", async (req, res, next) => {
//   try {
//     await db(       
//       `insert into photo (title, description, image, price, topic_id) values ('${req.body.title}', '${req.body.description}', '${req.body.image}', '${req.body.price}', '${req.body.topic_id}');`
//     );
//     res.send({ msg: "Photo inserted" });
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

// //Delete a photo  
// router.delete("/:topic_id/:photo_id", async (req, res) => {
// try{
//   await db(
//     `delete from photo where photo_id = ${req.params.photo_id};`);
//     res.send({ msg: "Photo deleted" });
// } catch (err) {
//   res.status(404).send(err);
// }  
// });


module.exports = router;
