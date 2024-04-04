const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  console.log(blog);
  console.log(decodedToken);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  blog.user = user._id;

  try {
    console.log("ana kont hna");
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: error.message });
  }
});
blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id; // Correct way to access parameters from URL
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }
    if (blog.user !== decodedToken.id) {
      return response
        .status(403)
        .json({ error: "You are not authorized to delete this blog" });
    }

    response.status(204).end(); // Indicates successful deletion with no content in response
  } catch (error) {
    console.log("ana hna ya jhone");
    response.status(400).json({ error: error.message });
  }
});
blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    url: body.url,
  };

  const ss = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});
blogsRouter.put("/like/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    
    // Find the blog by its ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' });
    }
    
    // Increment the likes property by 1
    blog.likes += 1;
    
    // Save the updated blog
    const updatedBlog = await blog.save();
    response.json(updatedBlog);
  } catch (error) {
    next(error); // Pass any errors to the error handler
  }
});

module.exports = blogsRouter;
