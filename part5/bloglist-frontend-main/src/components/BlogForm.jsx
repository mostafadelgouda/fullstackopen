
const BlogForm = ({ onSubmit, newBlogHandleChange, newBlog, url, handleUrlChange }) => {
  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={onSubmit}>
        <input
          value={newBlog}
          onChange={newBlogHandleChange}
        />
        <input
          value={url}
          onChange={handleUrlChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm