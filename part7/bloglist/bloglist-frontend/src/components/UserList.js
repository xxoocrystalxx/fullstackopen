// import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import usersService from '../services/users'

const UserList = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td align="center">{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
