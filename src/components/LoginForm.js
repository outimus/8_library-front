import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'

const LoginForm = ( props ) => {
  const [ loginUser, result ] = useMutation(LOGIN)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      props.setToken(token)
      props.setPage('authors')
      localStorage.setItem('logged-in-user', token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    loginUser({ variables: {username, password }})
    console.log('user is logged in...')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
