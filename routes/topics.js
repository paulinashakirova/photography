var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET topic listing. */
router.get('/', async (req, res) => {
  try {
    const topics = await models.Topic.findAll({
      attributes: ['id', 'theme', 'description', 'image']
    });
    res.send(topics);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET one topic
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const topic = await models.Topic.findOne({
      where: { id }
    });
    res.send(topic);
  } catch (err) {
    res.status(404).send(err);
  }
});

// INSERT a new topic into the DB
router.post('/', async (req, res) => {
  const { theme, description, image } = req.body;
  try {
    const topic = await models.Topic.create({ theme, description, image });
    res.send(topic);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete a topic
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await models.Topic.destroy({
      where: { id }
    });
    res.send({ msg: 'Topic deleted' });
  } catch (err) {
    res.status(404).send(err);
  }
});

// /* GET photo listing. */
// router.get('/:topic_id/photos', async (req, res, next) => {
//   try {
//     const results = await models(`SELECT * FROM photo where topic_id = ${req.params.topic_id};`);
//     res.send(results.data);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

module.exports = router;
