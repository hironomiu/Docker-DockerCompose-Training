import React, { useState, useEffect } from 'react'
import { Login } from './Login'
import SignUp from './SignUp'
import Main from './Main'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectTokenState,
  fetchCsrfTokenAsync,
  fetchTokenAsync,
  selectIsAuthentication,
} from '../features/auth/authSlice'
import * as config from '../config/index'

const App = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectTokenState)
  const isLogin = useSelector(selectIsAuthentication)
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({
    name: 'taro',
    email: 'taro@example.com',
    password: 'abcd',
  })
  const [isSignUp, setIsSignUp] = useState(false)

  useEffect(() => {
    dispatch(fetchCsrfTokenAsync())
    dispatch(fetchTokenAsync())
  })

  useEffect(() => {
    if (!isLogin) return
    if (!token) return
    ;(async () => {
      const res = await fetch(config.URL + '/api/v1/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      setUsers([...data])
    })()
  }, [isLogin, token])

  return (
    <div>
      <form action="">
        {isLogin ? null : isSignUp ? (
          <SignUp user={user} setUser={setUser} setIsSignUp={setIsSignUp} />
        ) : (
          <Login user={user} setUser={setUser} setIsSignUp={setIsSignUp} />
        )}
        {isLogin ? (
          <Main setUsers={setUsers} token={token} users={users} />
        ) : null}
      </form>
    </div>
  )
}

export default App
