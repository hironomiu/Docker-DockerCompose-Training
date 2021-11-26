import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login/loginSlice'
import credentialsReducer from '../features/credentials/credentialsSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    credentials: credentialsReducer,
  },
})
