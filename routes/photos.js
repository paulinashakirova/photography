var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET photo listing. */
router.get('/', async (req, res) => {
  try {
    const photos = await models.Photo.findAll({
      attributes: ['id', 'title', 'description', 'image', 'price']
    });
    res.send(photos);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET one photo
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const photo = await models.Photo.findOne({
      where: { id }
    });
    res.send(photo);
  } catch (err) {
    res.status(404).send(err);
  }
});

// INSERT a new photo into photos
router.post('/', async (req, res) => {
  const { title, description, image, price } = req.body;
  try {
    const photo = await models.Photo.create({ title, description, image, price });
    res.send(photo);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete a photo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await models.Photo.destroy({
      where: { id }
    });
    res.send({ msg: 'Photo deleted' });
  } catch (err) {
    res.status(404).send(err);
  }
});
module.exports = router;
