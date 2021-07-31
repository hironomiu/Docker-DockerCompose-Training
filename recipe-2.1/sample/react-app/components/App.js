import { useState, useEffect } from 'react'

const userEntry = async (name, setUsers, setName) => {
  const bodyData = JSON.stringify({ name: name })

  const res = await fetch('http://localhost:5000/api/users', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: bodyData,
  })
  const data = await res.json()

  setUsers((users) => [...users, { id: data.insertId, name: name }])
  setName('')
}

const getUsers = async (setUsers) => {
  const res = await fetch('http://localhost:5000/api/users')
  const json = await res.json()
  setUsers([...json])
}

const App = () => {
  const [name, setName] = useState('bob')
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers(setUsers)
  }, [])

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>
          {user.id}:{user.name}
        </div>
      ))}
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button
        onClick={() => {
          userEntry(name, setUsers, setName)
        }}
      >
        push
      </button>
    </div>
  )
}

export default App
