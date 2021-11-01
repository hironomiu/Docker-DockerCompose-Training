import React, { useState, useEffect } from 'react'
import Login from './Login'
import SignIn from './SignIn'
import Main from './Main'

const URL = 'http://localhost:5000'

const App = () => {
  const [token, setToken] = useState('')
  const [users, setUsers] = useState([])
  const [csrfToken, setCsrfToken] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('taro@example.com')
  const [password, setPassword] = useState('abcd')
  const [isSignIn, setIsSignIn] = useState(false)

  const init = async () => {
    console.log('called1')
    const res = await fetch(URL + '/api/v1/csrf-token', {
      method: 'GET',
      credentials: 'include',
    }).catch((err) => console.log(err))
    if (res) {
      const data = await res.json()
      console.log(data.csrfToken)
      setCsrfToken(data.csrfToken)
    }
    const res2 = await fetch(URL + '/api/v1/login', {
      method: 'GET',
      credentials: 'include',
    }).catch((err) => null)
    const status = await res.status
    console.log(status)
    if (res2) {
      const data = await res2.json()
      if (data.isSuccess) {
        setIsLogin(true)
        setToken(data.token)
      }
    }
  }
  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (!isLogin) return
    if (!token) return
    ;(async () => {
      const res = await fetch(URL + '/api/v1/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      console.log('data:', data)
      setUsers([...data])
    })()
  }, [isLogin, token])

  return (
    <div>
      <form action="">
        {isLogin ? null : isSignIn ? (
          <SignIn
            URL={URL}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            csrfToken={csrfToken}
            setToken={setToken}
            setIsLogin={setIsLogin}
            setIsSignIn={setIsSignIn}
          />
        ) : (
          <Login
            URL={URL}
            name={name}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            csrfToken={csrfToken}
            setToken={setToken}
            setIsLogin={setIsLogin}
            setIsSignIn={setIsSignIn}
          />
        )}
        {isLogin ? (
          <Main
            URL={URL}
            csrfToken={csrfToken}
            setToken={setToken}
            setUsers={setUsers}
            setIsLogin={setIsLogin}
            init={init}
            token={token}
            users={users}
          />
        ) : null}
      </form>
    </div>
  )
}

export default App
