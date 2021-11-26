import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCsrfTokenState,
  setToken,
  successAuthentication,
} from '../features/auth/authSlice'
import * as config from '../config/index'

const NoMemoLogin = ({ user, setUser, setIsSignUp }) => {
  const dispatch = useDispatch()
  const csrfToken = useSelector(selectCsrfTokenState)

  console.log(user)

  return (
    <div>
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
            const res = await fetch(config.URL + '/api/v1/login', {
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
                email: user.email,
                password: user.password,
              }),
            })
            const data = await res.json()
            if (data.isSuccess) {
              dispatch(setToken(data.token))
              dispatch(successAuthentication())
            } else {
              alert('認証エラー')
            }
          })()
        }}
      >
        login
      </button>
      <br />
      <span
        onClick={(e) => {
          e.preventDefault()
          setIsSignUp((isSignUp) => !isSignUp)
        }}
      >
        SignUp
      </span>
    </div>
  )
}

export const Login = memo(NoMemoLogin)
