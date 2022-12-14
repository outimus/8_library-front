import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { updateCache } from '../App'

const BooksByGenre = ({ books, genre, genres }) => {
  return (
    <>
      <h2>books</h2>
      <h3>in genre {genre}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
  )
}

const Books = (props) => {
  const [ genre, setGenre ] = useState(null)
  const books = useQuery(ALL_BOOKS, {
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook)
    }
  })
  const booksByGenres = useQuery(ALL_BOOKS, {
    variables: { genre }
  })
  const genres = useQuery(ALL_GENRES)
  
  if (!props.show) {
    return null
  }
  if (genre && booksByGenres.data) {
    return (
      <>
      <BooksByGenre
        books={booksByGenres.data.allBooks}
        genre={genre}
        genres={genres}
        onClose={() => setGenre(null)} /><table>
          <tbody>
            <tr>
              {genres.data.allGenres.map((ge) => (
                <td key={ge}>
                  <button onClick={() => setGenre(ge)}>{ge}</button>
                </td>
              ))}
              <td>
                <button onClick={() => setGenre(null)}>all genres</button>
              </td>
            </tr>
          </tbody>
        </table>
        </>
    )
  } else {
    return (
      <>
        <h2>books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p></p>
        <table>
          <tbody>
            <tr>
            {genres.data.allGenres.map((ge) => (
              <td key={ge}>
                <button onClick={() => setGenre(ge)}>{ge}</button>
              </td>
            ))}
            </tr>
          </tbody>
        </table>
        </>
    )
    }
  }
  
  

export default Books