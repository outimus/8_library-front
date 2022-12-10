import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>books</h2>
      <h3>in genre</h3>
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
            <thead>
                {books.data.allBooks.map((a) => (
                  <td key={a.title}>
                    <button>{a.genres}</button>
                    </td>
                ))}
            </thead>
          </table>
    </div>
  )
}

export default Books

//genre buttoneissa ei ole toimivat tagit.
//Tee sovellukseen query joka hakee kirjat tietyn genren mukaan