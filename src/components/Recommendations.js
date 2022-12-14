import { CURRENT_USER, ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

let genre = null

const Recommendations = (props) => {
  const loggedInUser = useQuery(CURRENT_USER)
  console.log(loggedInUser)
  if (loggedInUser.data) {
    genre = loggedInUser.data.me.favoriteGenre
  }
  const books = useQuery(ALL_BOOKS, {
    variables: { genre }})

  if (!props.show) {
    return null
  }
 
  return (
    <div>
        <h2>recommendations</h2>
          <h3>books in your favorite genre {genre}</h3>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {books.data.allBooks.map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations