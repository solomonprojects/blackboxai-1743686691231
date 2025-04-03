import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters']
  },
  category: { 
    type: String, 
    required: [true, 'Category is required'],
    enum: ['article', 'video', 'image', 'document', 'other']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  imageUrl: { 
    type: String,
    match: [/^https?:\/\/.+\..+/, 'Please use a valid URL']
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Update timestamp on save
contentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add text index for search
contentSchema.index({ 
  title: 'text', 
  description: 'text', 
  content: 'text',
  tags: 'text'
});

const Content = mongoose.model('Content', contentSchema);
export default Content;
