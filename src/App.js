import { useState } from 'react'
import { useApolloClient } from '@apollo/client'

//components
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
  const [token, setToken] = useState('')
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
          <Authors show={page === 'authors'}/>
          <Books show={page === 'books'}/>
          <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage}/>
        </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('newBook')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={() => handleLogout()}>logout</button>
      </div>
      <Authors show={page === 'authors'}/>
      <Books show={page === 'books'}/>
      <NewBook show={page === 'newBook'}/>
      <Recommendations show={page === 'recommendations'}/>
    </div>
  )
}

export default App
