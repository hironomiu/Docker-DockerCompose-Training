import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as C from '../../config/index'

const initialState = {
  isAuthentication: false,
  csrfToken: '',
  csrfFetchState: 'idle',
  token: '',
  tokenFetchState: 'idle',
}

export const fetchCsrfTokenAsync = createAsyncThunk(
  'auth/fetchCsrfToken',
  async () => {
    const res = await fetch(C.URL + '/api/v1/csrf-token', {
      method: 'GET',
      credentials: 'include',
    })
    const data = await res.json()
    return data.csrfToken
  }
)

export const fetchTokenAsync = createAsyncThunk('auth/fetchToken', async () => {
  const res = await fetch(C.URL + '/api/v1/login', {
    method: 'GET',
    credentials: 'include',
  })
  const data = await res.json()
  return data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    successAuthentication: (state) => {
      state.isAuthentication = true
    },
    logout: (state) => {
      state.isAuthentication = false
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    clearToken: (state) => {
      state.token = ''
      state.isAuthentication = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCsrfTokenAsync.pending, (state) => {
        state.csrfFetchState = 'loading'
      })
      .addCase(fetchCsrfTokenAsync.fulfilled, (state, action) => {
        state.csrfToken = action.payload
      })
      .addCase(fetchTokenAsync.pending, (state) => {
        state.tokenFetchState = 'loading'
      })
      .addCase(fetchTokenAsync.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          state.token = action.payload.token
          state.isAuthentication = true
        }
      })
  },
})

export const { setToken, clearToken, logout, successAuthentication } =
  authSlice.actions
export const selectIsAuthentication = (state) => state.auth.isAuthentication
export const selectCsrfTokenState = (state) => state.auth.csrfToken
export const selectTokenState = (state) => state.auth.token
export default authSlice.reducer
