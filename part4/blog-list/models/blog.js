const mongoose = require('mongoose')
const config = require('../utils/config')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: {
        type: String,
        required: true
    },
    
    likes: Number,
    user: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    
},
{
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        ret.likes = ret.likes || 0;
        delete ret._id;
        delete ret.__v;
      }
    },
    id: true // Enable the id option to use 'id' as the unique identifier property
  })

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(config.MONGODB_URI)

module.exports = mongoose.model('Blog', blogSchema)