const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "first blog",
    author: "first author",
    url: "first url",
    likes: 1,
  },
  {
    title: "second blog",
    author: "second author",
    url: "second url",
    likes: 2,
  },
  {
    title: "third blog",
    author: "third author",
    url: "third url",
    likes: 3,
  }
]
const initialUsers = [
  {
    username: "username1",
    name: "name1",
    password: "password1"
  },
  {
    username: "username2",
    name: "name2",
    password: "password2"
  },
  {
    username: "username3",
    name: "name3",
    password: "password3"
  },
]

// const nonExistingId = async () => {
//   const blog = new Blog({ content: 'willremovethissoon' })
//   await blog.save()
//   await blog.deleteOne()

//   return blog._id.toString()
// }

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}



////////////////////////////////////////
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach(element => {
    sum += element.likes
  });
  return sum

}
const favoriteBlog = (blogs) => {
  let mx = -1
  blogs.forEach(element => {
    
    if(mx === -1 || mx < element.likes)
      mx = element.likes
  });
  let ret = -1
  blogs.forEach(element => {
    if(mx === element.likes){
      console.log("max ", mx, element.likes)
      ret =
        {
          title: element.title,
          author: element.author,
          likes: element.likes
        }
      
    }
  });
  return ret
}
module.exports = {
  totalLikes,
  dummy,
  favoriteBlog,
  initialBlogs,
  blogsInDb,
  initialUsers,
}