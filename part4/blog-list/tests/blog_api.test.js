const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
//const { expect } = require('chai');

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('../utils/test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
  const newBlog = {
    author: "fourth author",
    likes: 4,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 3)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  // Assert that each blog object has an id property
  blogs.forEach(blog => {
    assert(blog.id !== undefined)
  })

  // Assert that _id property is not present in any of the blog objects
  blogs.forEach(blog => {
    assert(blog._id === undefined)
  })
})
test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: "fourth blog",
    author: "fourth author",
    url: "fourth url",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  blogs = response.body

  assert.strictEqual(blogs[3].likes, 0)

})
// test('The unique identifier property of the blog posts is by default _id', async () => {
//     const blogs = await Blog.find({})
//     blogs.expect(blogs[0]._id).toBeDefined()
// })


test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "fourth blog",
    author: "fourth author",
    url: "fourth url",
    likes: 4,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  assert.strictEqual(contents.length, helper.initialBlogs.length + 1)

  assert(contents.includes('fourth blog'))
})
// test('a blog can be deleted ', async () => {
//   const response = await api.get('/api/blogs')
//   blogs = response.body
//   const curBlog = blogs[0]
  
//   await api
//     .delete(`/api/blogs/${curBlog.id}`)
//     .expect(204)
//     //.expect('Content-Type', /application\/json/)
// })

describe('DELETE /api/blogs/:id', () => {
  test('Deleting a blog with a valid id should return status 201', async () => {
    // Create a new blog and save it to the database
    const newBlog = new Blog({
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 5
    });
    const savedBlog = await newBlog.save();

    // Send a DELETE request to the endpoint with the id of the saved blog
    await api
      .delete(`/api/blogs/${savedBlog.id}`)
      .expect(204);
  });

  test('Deleting a blog with an invalid id should return status 400', async () => {
    // Send a DELETE request to the endpoint with an invalid id
    await api
      .delete('/api/blogs/invalidId')
      .expect(400);
  });
});

describe('PUT /api/blogs/:id', () => {
  test('updating a blog entry', async () => {
    const blogsBefore = await api.get('/api/blogs');
    const blogToUpdate = blogsBefore.body[0]; // Assuming there's at least one blog entry
  
    const updatedData = {
      title: 'Updated Title',
      author: 'Updated Author',
      url: 'http://updated-url.com',
      likes: 10
    };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200); 
  });

});

after(async () => {
  await mongoose.connection.close()
})