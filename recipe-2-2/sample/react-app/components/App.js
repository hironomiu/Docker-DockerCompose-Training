import React, { useState, useEffect } from 'react'

const URL = 'http://localhost:5000'

const App = () => {
  const [token, setToken] = useState('')
  const [users, setUsers] = useState([])
  const [csrfToken, setCsrfToken] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [email, setEmail] = useState('taro@example.com')
  const [password, setPassword] = useState('abcd')

  const init = async () => {
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
      if (data.isSuccess) setIsLogin(true)
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

  const login = () => {
    return (
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            ;(async () => {
              console.log('csrfToken:', csrfToken)
              const res = await fetch(URL + '/api/v1/login', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  'CSRF-Token': csrfToken,
                },
                redirect: 'follow',
                body: JSON.stringify({ email: email, passWord: password }),
              })
              const data = await res.json()
              setToken(data.token)
              setIsLogin(true)
            })()
          }}
        >
          login
        </button>
      </div>
    )
  }

  const logout = () => {
    return (
      <>
        <button
          onClick={(e) => {
            e.preventDefault()
            ;(async () => {
              const res = await fetch(URL + '/api/v1/logout', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                  'CSRF-Token': csrfToken,
                },
                redirect: 'follow',
              })
              const data = await res.json()
              setToken(data.token)
              setUsers([])
              setIsLogin(false)
              init()
            })()
          }}
        >
          logout
        </button>
        <br />
        <span>token:{token}</span>
        <br />
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </>
    )
  }
  return (
    <div>
      <form action="">
        {isLogin ? null : login()}
        {isLogin ? logout() : null}
      </form>
    </div>
  )
}

export default App
