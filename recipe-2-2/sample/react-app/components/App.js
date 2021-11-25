import React, { useState, useEffect } from 'react'
import Login from './Login'
import SignUp from './SignUp'
import Main from './Main'
import { useDispatch, useSelector } from 'react-redux'
import { selectState, login } from '../feature/login/loginSlice'
import {
  setCsrfToken,
  setToken,
  selectTokenState,
  fetchCsrfTokenAsync,
} from '../feature/credentials/credentialsSlice'

const URL = 'http://localhost:5000'

const App = () => {
  const dispatch = useDispatch()
  const isLogin = useSelector(selectState)
  const token = useSelector(selectTokenState)
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('taro@example.com')
  const [password, setPassword] = useState('abcd')
  const [isSignUp, setIsSignUp] = useState(false)

  const init = async () => {
    try {
      // dispatch(fetchCsrfTokenAsync())
      const res = await fetch(URL + '/api/v1/csrf-token', {
        method: 'GET',
        credentials: 'include',
      })
      if (res) {
        const data = await res.json()
        dispatch(setCsrfToken(data.csrfToken))
      }

      const res2 = await fetch(URL + '/api/v1/login', {
        method: 'GET',
        credentials: 'include',
      })

      if (res2) {
        const data = await res2.json()
        if (data.isSuccess) {
          dispatch(login())
          dispatch(setToken(data.token))
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  // init()
  useEffect(() => {
    init()
  })

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
        {isLogin ? null : isSignUp ? (
          <SignUp
            URL={URL}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            setIsSignUp={setIsSignUp}
          />
        ) : (
          <Login
            URL={URL}
            name={name}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            setIsSignUp={setIsSignUp}
          />
        )}
        {isLogin ? (
          <Main
            URL={URL}
            setUsers={setUsers}
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
