import React from 'react'
import * as C from '../config/index'

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-400 w-screen absolute bottom-0 h-14">
        <div className="flex justify-center items-center"></div>
        <p className="pt-3 text-center">{C.SITE_NAME}@2021</p>
      </footer>
    </>
  )
}

export default Footer
