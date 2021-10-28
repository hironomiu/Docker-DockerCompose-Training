import React, { useState, useEffect } from 'react'

const App = () => {
  const [name, setName] = useState('hoge')
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data) => setUsers([...data]))
  }, [])
  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault()
          const data = JSON.stringify({ name: name })
          fetch('http://localhost:5000/api/users', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: data,
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res)
              setUsers((users) => [...users, { name: name }])
            })
        }}
      >
        push
      </button>
    </div>
  )
}

export default App
