import express from 'express';
import Content from '../models/Content.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create new content
router.post('/', auth, async (req, res) => {
  try {
    const content = new Content({
      ...req.body,
      owner: req.user._id
    });
    await content.save();
    res.status(201).send(content);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all content (authenticated users only)
router.get('/', auth, async (req, res) => {
  try {
    const content = await Content.find({ owner: req.user._id });
    res.send(content);
  } catch (error) {
    res.status(500).send();
  }
});

// Get specific content by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findOne({ 
      _id: req.params.id,
      owner: req.user._id 
    });

    if (!content) {
      return res.status(404).send();
    }
    res.send(content);
  } catch (error) {
    res.status(500).send();
  }
});

// Update content
router.patch('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );

    if (!content) {
      return res.status(404).send();
    }
    res.send(content);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete content
router.delete('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findOneAndDelete({ 
      _id: req.params.id,
      owner: req.user._id 
    });

    if (!content) {
      return res.status(404).send();
    }
    res.send(content);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
