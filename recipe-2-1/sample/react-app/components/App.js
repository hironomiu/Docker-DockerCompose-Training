import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api/users'

const userEntry = async (name, setUsers, setName) => {
  const bodyData = JSON.stringify({ name: name })

  const res = await fetch(API_URL, {
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
  const res = await fetch(API_URL)
  const json = await res.json()
  setUsers([...json])
}

const App = () => {
  const [name, setName] = useState('bob')
  const [users, setUsers] = useState([])
  const [buttonIs, setButtonIs] = useState(true)

  useEffect(() => {
    getUsers(setUsers)
  }, [])

  useEffect(() => {
    if (name.length !== 0) {
      setButtonIs(false)
    } else {
      setButtonIs(true)
    }
  }, [name])

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>
          {user.id}:{user.name}
        </div>
      ))}
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value)
          if (name.length !== 0) {
            setButtonIs(false)
          }
        }}
        value={name}
      />
      <button
        onClick={() => {
          userEntry(name, setUsers, setName)
          setButtonIs(true)
        }}
        disabled={buttonIs}
      >
        push
      </button>
    </div>
  )
}

export default App
