import { memo } from 'react'
import * as C from '../config/index'

const NoMemoFooter = () => {
  return (
    <>
      <footer className="bg-gray-400 w-screen absolute bottom-0 h-12">
        <div className="flex justify-center items-center"></div>
        <p className="pt-3 text-center">{C.SITE_NAME}@2021</p>
      </footer>
    </>
  )
}

export const Footer = memo(NoMemoFooter)
