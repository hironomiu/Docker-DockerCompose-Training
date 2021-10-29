import React, { useState, useEffect } from 'react'

const URL = 'http://localhost:5000'

const App = () => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})
  const [csrfToken, setCsrfToken] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [email, setEmail] = useState('taro@example.com')
  const [password, setPassword] = useState('abcd')

  useEffect(() => {
    ;(async () => {
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
    })()
  }, [])

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
  return (
    <div>
      <form action="">
        {isLogin ? null : login()}
        {isLogin ? (
          <button
            onClick={(e) => {
              e.preventDefault()
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
                setUser(data)
              })()
            }}
          >
            user
          </button>
        ) : null}
        {isLogin ? (
          <button
            onClick={(e) => {
              // e.preventDefault()
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
                setUser({})
                setIsLogin(false)
              })()
            }}
          >
            logout
          </button>
        ) : null}
      </form>
      token:{token}
      <br />
      user:{user.userId ? user.userId : null}
      {user.name ? ',' + user.name : null}
    </div>
  )
}

export default App
