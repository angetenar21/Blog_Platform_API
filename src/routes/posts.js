const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');

const router = express.Router();

// Helper to map validation errors
const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

// Create Post
router.post(
  '/',
  [
    body('title').isString().trim().notEmpty().withMessage('title is required'),
    body('content').isString().notEmpty().withMessage('content is required'),
    body('category').isString().trim().notEmpty().withMessage('category is required'),
    body('tags').optional().isArray().withMessage('tags must be an array of strings'),
  ],
  async (req, res, next) => {
    try {
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        return res.status(400).json({ errors: validation.array() });
      }

      const { title, content, category, tags } = req.body;
      const post = new Post({ title, content, category, tags });
      await post.save();

      res.status(201).json({
        id: post._id,
        title: post.title,
        content: post.content,
        category: post.category,
        tags: post.tags,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Get all posts (with optional ?term=)
router.get('/', async (req, res, next) => {
  try {
    const { term } = req.query;
    let posts;
    if (term) {
      // text search (uses index). Fall back to regex if text not suitable.
      // Case-insensitive wildcard search using regex on the three fields:
      const regex = new RegExp(term, 'i');
      posts = await Post.find({
        $or: [{ title: regex }, { content: regex }, { category: regex }],
      }).sort({ createdAt: -1 });
    } else {
      posts = await Post.find().sort({ createdAt: -1 });
    }

    const out = posts.map((p) => ({
      id: p._id,
      title: p.title,
      content: p.content,
      category: p.category,
      tags: p.tags,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));

    res.json(out);
  } catch (err) {
    next(err);
  }
});

// Get single post
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json({
      id: post._id,
      title: post.title,
      content: post.content,
      category: post.category,
      tags: post.tags,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    });
  } catch (err) {
    // if invalid ObjectId, Mongoose throws CastError — map to 404
    if (err.name === 'CastError') return res.status(404).json({ error: 'Post not found' });
    next(err);
  }
});

// Update post (PUT) - replace fields
router.put(
  '/:id',
  [
    body('title').isString().trim().notEmpty().withMessage('title is required'),
    body('content').isString().notEmpty().withMessage('content is required'),
    body('category').isString().trim().notEmpty().withMessage('category is required'),
    body('tags').optional().isArray().withMessage('tags must be an array of strings'),
  ],
  async (req, res, next) => {
    try {
      const validation = validationResult(req);
      if (!validation.isEmpty()) return res.status(400).json({ errors: validation.array() });

      const { title, content, category, tags } = req.body;

      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post not found' });

      post.title = title;
      post.content = content;
      post.category = category;
      post.tags = tags || [];

      await post.save();

      res.json({
        id: post._id,
        title: post.title,
        content: post.content,
        category: post.category,
        tags: post.tags,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      });
    } catch (err) {
      if (err.name === 'CastError') return res.status(404).json({ error: 'Post not found' });
      next(err);
    }
  }
);

// Delete post
router.delete('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    await post.deleteOne();
    // 204 No Content
    res.status(204).send();
  } catch (err) {
    if (err.name === 'CastError') return res.status(404).json({ error: 'Post not found' });
    next(err);
  }
});

module.exports = router;
