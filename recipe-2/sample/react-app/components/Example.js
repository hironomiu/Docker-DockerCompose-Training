import React, { useState, useEffect } from 'react'

const App = () => {
  const [message, setMessage] = useState('hoge')

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((res) => setMessage(res.message))
  }, [])
  return (
    <div>
      hello!:{message}
      <form action="">
        <button
          onClick={(e) => {
            e.preventDefault()
            const data = JSON.stringify({ name: 'hoge' })
            console.log(data)
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
                setMessage(res.message)
              })
          }}
        >
          push
        </button>
      </form>
    </div>
  )
}

export default App
