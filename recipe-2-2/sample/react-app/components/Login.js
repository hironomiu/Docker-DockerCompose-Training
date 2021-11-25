import { useDispatch, useSelector } from 'react-redux'
import { login } from '../feature/login/loginSlice'
import {
  selectCsrfTokenState,
  setToken,
} from '../feature/credentials/credentialsSlice'

const Login = ({
  URL,
  email,
  setEmail,
  password,
  setPassword,
  setIsSignUp,
}) => {
  const dispatch = useDispatch()
  const csrfToken = useSelector(selectCsrfTokenState)

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
              body: JSON.stringify({ email: email, password: password }),
            })
            const data = await res.json()
            if (data.isSuccess) {
              dispatch(setToken(data.token))
              dispatch(login())
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

export default Login
