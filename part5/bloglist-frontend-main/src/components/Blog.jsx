import Togglable from './Togglable'

const Blog = ({ blog, addLike, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel="view">

        <div>
          {blog.url}
        </div>
        <div>
      likes {blog.likes}
        </div>
        <div>
          {blog.author}
        </div>
        <button onClick={() => addLike(blog.id)}>like</button>
        <button onClick={() => removeBlog(blog.id)}>remove blog</button>
      </Togglable>
    </div>
  )
}

export default Blog
