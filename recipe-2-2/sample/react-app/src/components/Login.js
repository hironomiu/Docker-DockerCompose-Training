import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCsrfTokenState,
  postAuthenticationAsync,
} from '../features/auth/authSlice'
import * as C from '../config/index'

const NoMemoLogin = ({ user, setUser, setIsSignUp }) => {
  const dispatch = useDispatch()
  const csrfToken = useSelector(selectCsrfTokenState)

  return (
    <div>
      <div className="flex bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-col font-mono ">
        <h1 className="bg-white pt-10 pb-8 font-bold rounded text-3xl">
          {C.SITE_NAME}
        </h1>
        <h1 className="bg-white pt-6 pb-4 font-bold rounded text-xl">Login</h1>
        <div className="mb-4">
          <label
            className="block text-grey-darker pt-2 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="email"
            type="text"
            placeholder="Email"
            autoFocus={true}
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm pt-2 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password"
              type="password"
              placeholder="******************"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <p className="text-red text-xs italic">Please choose a password.</p>
          </div>
          <div className="flex items-left flex-col">
            <button
              type="button"
              className="bg-gray-600 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                e.preventDefault()
                dispatch(
                  postAuthenticationAsync({
                    csrfToken: csrfToken,
                    email: user.email,
                    password: user.password,
                  })
                )
              }}
            >
              Login
            </button>
            <div className="mt-4">
              <span
                onClick={(e) => {
                  e.preventDefault()
                  setIsSignUp((isSignUp) => !isSignUp)
                }}
              >
                SignUp?
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Login = memo(NoMemoLogin)
