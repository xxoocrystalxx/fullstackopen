import { useState } from 'react'

const Blog = ({ blog, updateLikes, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLikes = () => {
    const modifiedBlog = { ...blog, likes: blog.likes + 1 }
    updateLikes(modifiedBlog)
  }

  const remove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      handleDelete(blog.id)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes <span id="likes">{blog.likes}</span>
            <button onClick={addLikes} i="likes-button">
              like
            </button>
          </div>
          <div>{blog.user.username}</div>
          {blog.user.username === user.username && (
            <button onClick={remove} id="remove-button">
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
