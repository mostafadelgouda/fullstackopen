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
    
    likes: Number
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
// blogSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject.__v
//     }
//   })
  
const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(config.MONGODB_URI)

module.exports = mongoose.model('Blog', blogSchema)