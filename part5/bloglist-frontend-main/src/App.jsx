import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import Togglable from './components/Togglable'

function compareFn(a, b) {
  if (a.likes < b.likes)
    return -1
  return 1
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(compareFn)))
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    console.log(user)
    const blogObject = {
      title: newBlog,
      author: user.username,
      url: url,
    }

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog('')
    })
    setErrorMessage('blog is added successfully')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const removeBlog = async (id) => {
    if (window.confirm('Do you really want to delete the blog?')) {


      try {
        await blogService.removeBlog(id)
        const updatedBlogs = blogs.filter(blog => blog.id !== id)
        setBlogs(updatedBlogs)
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }
  const addLike = async (id) => {
    try {
      await blogService.addLike(id)
      const updatedBlogs = blogs.map(blog =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
      setBlogs(updatedBlogs)
    } catch (error) {
      console.error('Error adding like:', error)
    }
  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //console.log("wrong credentials")
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {user && <button onClick={() => setUser(null)}>logout</button>}
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="login">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        </div>
      )}

      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm
          onSubmit={addBlog}
          newBlog={newBlog}
          newBlogHandleChange={handleBlogChange}
          url={url}
          handleUrlChange={handleUrlChange}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} />
      ))}
    </div>
  )
}

export default App
