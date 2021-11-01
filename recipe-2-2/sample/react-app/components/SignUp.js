import React from 'react'

const SignUp = ({
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
  setIsSignUp,
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
                password: password,
              }),
            })
            const data = await res.json()
            if (data.isSuccess) {
              setIsSignUp(false)
            } else {
              alert('ユーザ登録エラー')
            }
          })()
        }}
      >
        SignUp
      </button>
      <br />
      <span
        onClick={(e) => {
          e.preventDefault()
          setIsSignUp((isSignUp) => !isSignUp)
        }}
      >
        Login
      </span>
    </div>
  )
}

export default SignUp
