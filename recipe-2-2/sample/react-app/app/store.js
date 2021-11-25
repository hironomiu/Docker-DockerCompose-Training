import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../feature/login/loginSlice'
import credentialsReducer from '../feature/credentials/credentialsSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    credentials: credentialsReducer,
  },
})
