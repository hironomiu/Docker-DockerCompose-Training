import React, { useState, useEffect } from 'react'

const App = () => {
  const [message, setMessage] = useState('hoge')

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
  }, [])

  return <div>hello:{message}</div>
}

export default App
