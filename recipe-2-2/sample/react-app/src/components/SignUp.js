import { memo } from 'react'
import { useSelector } from 'react-redux'
import { selectCsrfTokenState } from '../features/auth/authSlice'
import * as C from '../config/index'

const NoMemoSignUp = ({ user, setUser, setIsSignUp }) => {
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
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="name"
            type="text"
            placeholder="Name"
            autoFocus={true}
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
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
                ;(async () => {
                  console.log('csrfToken:', csrfToken)
                  const res = await fetch(C.URL + '/api/v1/users', {
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
            <div className="mt-4">
              <span
                onClick={(e) => {
                  e.preventDefault()
                  setIsSignUp((isSignUp) => !isSignUp)
                }}
              >
                Login?
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SignUp = memo(NoMemoSignUp)
