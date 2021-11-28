import React from 'react'
import Main from './Main'
import Header from './Header'

const Layout = () => {
  return (
    <div className="flex items-center flex-col min-h-screen text-gray-600 font-mono">
      <Header />
      <Main />
    </div>
  )
}

export default Layout
