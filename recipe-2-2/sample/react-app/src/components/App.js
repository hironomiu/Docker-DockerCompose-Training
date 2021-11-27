import React, { useState, useEffect } from 'react'
import { Login } from './Login'
import { SignUp } from './SignUp'
import Main from './Main'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCsrfTokenAsync,
  fetchTokenAsync,
  selectIsAuthentication,
  selectCsrfTokenState,
} from '../features/auth/authSlice'

const App = () => {
  const dispatch = useDispatch()
  const isLogin = useSelector(selectIsAuthentication)
  const csrfToken = useSelector(selectCsrfTokenState)
  const [user, setUser] = useState({
    name: 'taro',
    email: 'taro@example.com',
    password: 'abcd',
  })
  const [isSignUp, setIsSignUp] = useState(false)

  useEffect(() => {
    console.log('effect called')
    dispatch(fetchCsrfTokenAsync())
    dispatch(fetchTokenAsync())
  }, [dispatch])

  console.log('app csrfToken', csrfToken)

  return (
    <div>
      <form action="">
        {isLogin ? null : isSignUp ? (
          <SignUp user={user} setUser={setUser} setIsSignUp={setIsSignUp} />
        ) : (
          <Login user={user} setUser={setUser} setIsSignUp={setIsSignUp} />
        )}
        {isLogin ? <Main /> : null}
      </form>
    </div>
  )
}

export default App
