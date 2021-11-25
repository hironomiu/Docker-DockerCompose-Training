import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: false }

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
      state.value = true
    },
    logout: (state) => {
      state.value = false
    },
  },
})

export const { login, logout } = loginSlice.actions
export const selectState = (state) => state.login.value
export default loginSlice.reducer
