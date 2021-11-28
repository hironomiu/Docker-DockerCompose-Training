import React, { useState } from 'react'
import { LogoutIcon } from '@heroicons/react/outline'
import * as C from '../config/index'
import Modal from './Modal'

const Header = () => {
  const [modalOn, setModalOn] = useState(false)

  return (
    <>
      <header className="flex items-center pl-8 h-14 bg-gray-600 w-screen">
        <nav className="bg-gray-600 w-screen">
          <div className="flex items-center pl-8 pr-8 h-14 justify-between">
            <div>
              <span className="font-semibold text-xl tracking-tight text-white">
                {C.SITE_NAME}
              </span>
            </div>
            <div>
              <LogoutIcon
                className="h-14 w-14 text-gray-300 hover:bg-gray-700 px-1 rounded"
                aria-hidden="true"
                onClick={(e) => {
                  setModalOn(true)
                }}
              />
            </div>
            {modalOn ? <Modal setModalOn={setModalOn} /> : null}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
