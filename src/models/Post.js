const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Optionally, create an index to speed up text searches
PostSchema.index({ title: 'text', content: 'text', category: 'text' });

module.exports = mongoose.model('Post', PostSchema);