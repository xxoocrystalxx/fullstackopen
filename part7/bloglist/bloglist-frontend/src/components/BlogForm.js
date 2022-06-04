import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-3">
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            id="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            id="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url</Form.Label>
          <Form.Control
            type="text"
            value={url}
            id="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button type="submit" id="create-button">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
