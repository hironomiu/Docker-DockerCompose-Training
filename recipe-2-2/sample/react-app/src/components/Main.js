import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/login/loginSlice'
import {
  selectCsrfTokenState,
  setToken,
} from '../features/credentials/credentialsSlice'

const Main = ({
  URL,
  // csrfToken,
  // setToken,
  setUsers,
  init,
  token,
  users,
}) => {
  const dispatch = useDispatch()
  const csrfToken = useSelector(selectCsrfTokenState)
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
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
            dispatch(setToken(data.token))
            setUsers([])
            dispatch(logout())
            init()
          })()
        }}
      >
        logout
      </button>
      <br />
      <span>token:{token}</span>
      <br />
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </>
  )
}

export default Main
