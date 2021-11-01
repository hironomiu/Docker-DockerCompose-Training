import React from 'react'

const Main = ({
  URL,
  csrfToken,
  setToken,
  setUsers,
  setIsLogin,
  init,
  token,
  users,
}) => {
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
            setToken(data.token)
            setUsers([])
            setIsLogin(false)
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
