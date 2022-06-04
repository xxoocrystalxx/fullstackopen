import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { likeABlog, removeBlog, addComment } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  if (!blog) {
    return null
  }

  const addLikes = () => {
    const modifiedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeABlog(modifiedBlog))
  }

  const remove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
      navigate('/')
    }
  }

  const handleComment = () => {
    dispatch(addComment(blog.id, comment))
    setComment('')
  }

  const own = blog.user.username ? blog.user.username : user.username

  return (
    <div className="blog">
      <h1>
        {blog.title} {blog.author}
      </h1>

      <div>
        <div>{blog.url}</div>
        <div>
          likes <span id="likes">{blog.likes}</span>
          <button onClick={addLikes} i="likes-button">
            like
          </button>
        </div>
        <div>added by {own}</div>
        {own === user.username && (
          <button onClick={remove} id="remove-button">
            remove
          </button>
        )}
      </div>
      <h3>comments</h3>
      <input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button onClick={handleComment}>add comment</button>
      <ul>
        {blog.comments.map((c) => (
          <li key={c}>{c} </li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
