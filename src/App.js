import { useState } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

//components
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
}
cache.updateQuery(query, ({ allBooks }) => {
  return {
    allBooks: uniqByName(allBooks.concat(addedBook)),
  }
})
}

const App = () => {
  const [token, setToken] = useState('')
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      window.alert(`A book "${addedBook.title}" was added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      },
    })

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
