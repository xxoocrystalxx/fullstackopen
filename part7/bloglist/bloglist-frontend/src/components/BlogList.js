import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Toggable'
import BlogForm from './BlogForm'
import { Table } from 'react-bootstrap'

const BlogList = ({ blogFormRef, addBlog }) => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <Table striped bordered hover>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
