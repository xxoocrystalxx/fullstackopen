import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Menu = ({ user }) => {
  const dispatch = useDispatch()

  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="me-auto">
        <Nav.Link href="#" as="span">
          <Link className="padding" to="/">
            blogs
          </Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link className="padding" to="/users">
            users
          </Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          {user && (
            <span>
              {user.name} logged in{' '}
              <button onClick={() => dispatch(logout())}>logout</button>
            </span>
          )}
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Menu
