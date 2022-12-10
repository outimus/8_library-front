import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]})
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    updateAuthor({variables: { name, born }})
    setName('')
    setBorn('')
  }
  console.log(authors)
  if (authors.loading)  {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form>
        <select className='select-tag' onChange={e => setName(e.target.value)}>
          <option></option>
          {authors.data.allAuthors.map((a) => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </select><br></br>
        <>born: </><input className='input' type="number" onChange={({ target }) => setBorn(Number(target.value))}></input><br></br>
        <button onClick={handleSubmit}>update author</button>
      </form>
    </div>
  )
}

export default Authors
