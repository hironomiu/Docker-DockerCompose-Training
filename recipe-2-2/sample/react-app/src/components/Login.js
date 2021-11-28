import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCsrfTokenState,
  postAuthenticationAsync,
  toggleSignUp,
} from '../features/auth/authSlice'

const NoMemoLogin = ({ user, setUser, setIsSignUp }) => {
  const dispatch = useDispatch()
  const csrfToken = useSelector(selectCsrfTokenState)

  return (
    <>
      <div className="mb-4 w-3/5">
        <label
          className="block text-grey-darker pt-2 text-sm font-bold mb-2"
          htmlFor="email"
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
                dispatch(toggleSignUp())
              }}
            >
              Switch SignUp?(CLICK!!)
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export const Login = memo(NoMemoLogin)
