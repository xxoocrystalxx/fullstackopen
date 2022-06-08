import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const genreResult = useQuery(ALL_GENRES)
  const [genre, setGenre] = useState('')

  if (!props.show || result.loading) {
    return null
  }

  const books = result.data.allBooks
  const unique = genreResult.data.allGenres
  const bookToshow =
    genre === '' ? books : books.filter((b) => b.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookToshow.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {unique.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre('')}>allGenres</button>
    </div>
  )
}

export default Books
