import { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
  const me = useQuery(ME)
  const [getResult, result] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [genre,setGenre] = useState('')

  useEffect(() => {
    if (props.token) {
      if (me.data && me.data.me !== null) {
        setGenre(me.data.me.favouriteGenre)
        getResult({ variables: { genre } })
        if (result.data) {
          setBooks(result.data.allBooks)
        }
      }
    }
  }, [genre, getResult, me.data, props.token, result.data])

  if (!props.show) {
    return null
  }
  return (
    <div>
      <h3>recommendations</h3>
      books in you favorite genre <b>{genre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
