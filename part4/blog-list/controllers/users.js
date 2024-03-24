const usersRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const bcrypt = require('bcrypt')



usersRouter.get('/', async (request, response) => {
    //console.log('ana hna')
  const users = await User.find({}).populate('blogs', {title: 2, likes: 2})
  console.log(users)
  response.status(201).json(users);
  //response.json(users)
})

usersRouter.post('/', async (request, response) => {
    let user = new User(request.body)
    const saltRounds = 10
    if(request.body.password.length < 3)
        return response.status(400).json({message: "password is too short"})
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)
    
    user.password = passwordHash
    //console.log(passwordHash)
    //console.log(request.body.password)
    
    try{
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    }catch(error){
        response.status(400).json({ error: error.message })
    }
})
// blogsRouter.delete('/:id', async (request, response) => {
//     const id = request.params.id; // Correct way to access parameters from URL
//     try {
//         const blog = await Blog.findByIdAndDelete(id);
//         if (!blog) {
//             return response.status(404).json({ error: 'Blog not found' });
//         }
//         response.status(204).end(); // Indicates successful deletion with no content in response
//     } catch (error) {
//         console.log("ana hna ya jhone")
//         response.status(400).json({ error: error.message });
//     }

// })
// blogsRouter.put('/:id', async (request, response) => {
//     const body = request.body
  
//     const blog = {
//       title: body.title,
//       url: body.url,
//     }
  
//     const ss = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//       .then(updatedBlog => {
//         response.json(updatedBlog)
//       })
//       .catch(error => next(error))
//   })

module.exports = usersRouter