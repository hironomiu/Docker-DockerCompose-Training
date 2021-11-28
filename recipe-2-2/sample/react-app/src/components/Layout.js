import { useState } from 'react'
import { useSelector } from 'react-redux'
import Main from './Main'
import Header from './Header'
import Footer from './Footer'
import { Login } from './Login'
import { SignUp } from './SignUp'
import {
  selectIsAuthentication,
  selectIsSignUp,
} from '../features/auth/authSlice'

const Layout = () => {
  const isLogin = useSelector(selectIsAuthentication)
  const isSignUp = useSelector(selectIsSignUp)
  const [user, setUser] = useState({
    name: 'taro',
    email: 'taro@example.com',
    password: 'abcd',
  })
  return (
    <div className="flex items-center flex-col min-h-screen text-gray-600 font-mono">
      <Header />
      {isLogin ? null : isSignUp ? (
        <SignUp user={user} setUser={setUser} />
      ) : (
        <Login user={user} setUser={setUser} />
      )}
      {isLogin ? <Main /> : null}
      <Footer />
    </div>
  )
}

export default Layout
