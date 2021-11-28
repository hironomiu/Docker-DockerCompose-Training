import React, { useEffect } from 'react'

import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCsrfTokenAsync,
  fetchTokenAsync,
  selectCsrfTokenState,
} from '../features/auth/authSlice'

const App = () => {
  const dispatch = useDispatch()
  const csrfToken = useSelector(selectCsrfTokenState)
  useEffect(() => {
    dispatch(fetchCsrfTokenAsync())
    dispatch(fetchTokenAsync())
  }, [dispatch])

  console.log('app csrfToken', csrfToken)

  return (
    <>
      <Layout />
    </>
  )
}

export default App
