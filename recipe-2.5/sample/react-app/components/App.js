import React, { useState, useEffect } from "react"

const App = () => {
  const [message, setMessage] = useState("hoge")
  const [token, setToken] = useState("")

  useEffect(() => {
    fetch("https://localhost")
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
            const data = JSON.stringify({ userId: "001", passWord: "qwerty" })
            console.log(data)
            fetch("https://localhost/api/v1/login", {
              method: "POST",
              mode: "cors",
              cache: "no-cache",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              redirect: "follow",
              body: data,
            })
              .then((res) => res.json())
              .then((res) => {
                console.log(res)
                setToken(res.token)
              })
          }}
        >
          login
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            fetch("https://localhost/api/v1/users", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())
              .then((res) => {
                console.log(res)
                //  setToken(res.token)
              })
          }}
        >
          user
        </button>
      </form>
    </div>
  )
}

export default App
