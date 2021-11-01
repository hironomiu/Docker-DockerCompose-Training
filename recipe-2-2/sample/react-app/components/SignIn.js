import React from 'react'

const SignIn = ({
  URL,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  csrfToken,
  setToken,
  setIsLogin,
  setIsSignIn,
}) => {
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault()
          ;(async () => {
            console.log('csrfToken:', csrfToken)
            const res = await fetch(URL + '/api/v1/users', {
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
                name: name,
                email: email,
                passWord: password,
              }),
            })
            const data = await res.json()
            if (data.isSuccess) {
              console.log(data.message)
              setIsSignIn(false)
            } else {
              alert('ユーザ登録エラー')
            }
          })()
        }}
      >
        SignIn
      </button>
      <br />
      <span
        onClick={(e) => {
          e.preventDefault()
          setIsSignIn((isSignIn) => !isSignIn)
        }}
      >
        Login
      </span>
    </div>
  )
}

export default SignIn
