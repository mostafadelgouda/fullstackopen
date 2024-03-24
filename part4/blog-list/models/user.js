const mongoose = require('mongoose')
const config = require('../utils/config')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    blogs:[ 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ]
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
  
const Blog = mongoose.model('User', userSchema)

mongoose.connect(config.MONGODB_URI)

module.exports = mongoose.model('User', userSchema)