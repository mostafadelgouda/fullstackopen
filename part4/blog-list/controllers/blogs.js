const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    try{
        const savedNote = await blog.save()
        response.status(201).json(savedNote)
    }catch(error){
        response.status(400).json({ error: error.message })
    }
})
blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id; // Correct way to access parameters from URL
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return response.status(404).json({ error: 'Blog not found' });
        }
        response.status(204).end(); // Indicates successful deletion with no content in response
    } catch (error) {
        console.log("ana hna ya jhone")
        response.status(400).json({ error: error.message });
    }

})
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      url: body.url,
    }
  
    const ss = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(updatedBlog => {
        response.json(updatedBlog)
      })
      .catch(error => next(error))
  })
// blogsRouter.put('/:id', async (request, response) => {
//    blogsRouter.put('/:id', async (request, response) => {
//     const id = request.params.id;
//     const update = request.body; // Use the request body directly for update
//     try {
//         // Ensure that the update operation returns the updated blog entry
//         const updatedBlog = await Blog.findByIdAndUpdate(id, update, { new: true });

//         if (!updatedBlog) {
//             return response.status(404).json({ error: 'Blog not found' });
//         }

//         response.status(204).end(); // Indicates successful update with no content in response
//     } catch (error) {
//         console.error(error); // Log the error message to the console
//         response.status(400).json({ error: 'Failed to update blog entry' });
//     }
// })

// })

module.exports = blogsRouter