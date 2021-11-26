import React from 'react'
import { useSelector } from 'react-redux'
import { selectCsrfTokenState } from '../features/auth/authSlice'
import * as config from '../config/index'

const SignUp = ({
  user,
  setUser,
  // name,
  // setName,
  // email,
  // setEmail,
  // password,
  // setPassword,
  setIsSignUp,
}) => {
  const csrfToken = useSelector(selectCsrfTokenState)
  return (
    <div>
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={(e) => {
          e.preventDefault()
          ;(async () => {
            console.log('csrfToken:', csrfToken)
            const res = await fetch(config.URL + '/api/v1/users', {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                'CSRF-Token': csrfToken,
              },
              redirect: 'follow',
              body: JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.password,
              }),
            })
            const data = await res.json()
            if (data.isSuccess) {
              setIsSignUp(false)
            } else {
              alert('ユーザ登録エラー')
            }
          })()
        }}
      >
        SignUp
      </button>
      <br />
      <span
        onClick={(e) => {
          e.preventDefault()
          setIsSignUp((isSignUp) => !isSignUp)
        }}
      >
        Login
      </span>
    </div>
  )
}

export default SignUp
