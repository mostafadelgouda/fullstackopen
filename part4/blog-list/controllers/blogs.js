const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
    // console.log("ay 7aga")
    // console.log("ana m4 5rong")
    // const blog = new Blog({
    //     title: "ss",
    //     author: "ss",
    //     url: "ss",
    //     likes: 4122312312
    // })
    // blog
    // .save()
    // .then(result => {
    //   response.status(201).json(result)
    // })
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
    console.log("5od")
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter