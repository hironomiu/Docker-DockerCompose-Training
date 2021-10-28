import React, { useState, useEffect } from "react"

const URL = "http://localhost:5000"
const DUMMY_USER = JSON.stringify({ userId: "001", passWord: "qwerty" })

const App = () => {
  const [token, setToken] = useState("")
  const [user, setUser] = useState({})
  const [csrfToken, setCsrfToken] = useState("")

  useEffect(() => {
    ;(async () => {
      const res = await fetch(URL + "/api/v1/csrf-token", {
        method: "GET",
        credentials: "include",
      })
      const data = await res.json()
      setCsrfToken(data.csrfToken)
    })()
  }, [])
  return (
    <div>
      <form action="">
        <button
          onClick={(e) => {
            e.preventDefault()
            ;(async () => {
              const res = await fetch(URL + "/api/v1/login", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  "CSRF-Token": csrfToken,
                },
                redirect: "follow",
                body: DUMMY_USER,
              })
              const data = await res.json()
              setToken(data.token)
            })()
          }}
        >
          login
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            ;(async () => {
              const res = await fetch(URL + "/api/v1/users", {
                method: "GET",
                credentials: "include",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              const data = await res.json()
              setUser(data)
            })()
          }}
        >
          user
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            ;(async () => {
              const res = await fetch(URL + "/api/v1/logout", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  "CSRF-Token": csrfToken,
                },
                redirect: "follow",
                body: DUMMY_USER,
              })
              const data = await res.json()
              setToken(data.token)
              setUser({})
            })()
          }}
        >
          logout
        </button>
      </form>
      token:{token}
      <br />
      user:{user.userId ? user.userId : null}
      {user.name ? "," + user.name : null}
    </div>
  )
}

export default App
