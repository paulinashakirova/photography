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
  console.log('the id is', id);
  try {
    await models.Topic.destroy({
      where: { id }
    });
    res.send({ msg: 'Topic deleted' });
  } catch (err) {
    res.status(404).send(err);
  }
});
//photos=actors,topics=movies
router.post('/:id/photos', async (req, res) => {
  const { id } = req.params;
  const { title, description, image, price } = req.body;
  try {
    const topic = await models.Topic.findOne({ where: { id } });
    const data = await topic.createPhoto({ title, description, image, price });
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
//how do i use put?
router.put('/:id/photos', async (req, res) => {
  const { id } = req.params;
  const { photos } = req.body;
  try {
    const topic = await models.Topic.findOne({ where: { id } });
    const photo = await topic.addPhoto(topic);
    res.send(photo);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
