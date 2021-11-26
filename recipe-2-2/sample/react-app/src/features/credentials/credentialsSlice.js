import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const URL = 'http://localhost:5000'

const initialState = {
  csrfToken: '',
  token: '',
  status: 'idle',
}

export const testAsync = createAsyncThunk()('test', async () => {
  const res = await new Promise((resolve) =>
    setTimeout(() => resolve({ data: 10 }), 1000)
  )
})
export const fetchCsrfTokenAsync = createAsyncThunk(
  'credentials/fetchCsrfToken',
  async () => {
    const res = await fetch(URL + '/api/v1/csrf-token', {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json())
    // if (res) {
    //   const data = await res.json()
    //   console.log("data:",data)
    //   return data
    // }
    console.log(res)
    return res.csrfToken
  }
)
const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    setCsrfToken: (state, action) => {
      state.csrfToken = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      (testAsync.pending = (state) => {
        console.log('test pending')
        state.status = 'loadng'
      })
    )
    // .addCase(testAsync.fulfilled = (state) => {
    //   state.status = 'idle'
    // })
    // .addCase(fetchCsrfTokenAsync.pending = (state) => {
    //   console.log('loading')
    //   state.status = 'loading'
    // })
    // .addCase(fetchCsrfTokenAsync.fulfilled = (state,action) => {
    //   state.status = 'idle'
    //   console.log("payload:",action.payload)
    //   state.csrfToken = action.payload
    // })
    // .addCase(fetchCsrfTokenAsync.rejected = () =>{
    //   console.log('rejected')
    // })
  },
})

export const { setCsrfToken, setToken } = credentialsSlice.actions
export const selectCsrfTokenState = (state) => state.credentials.csrfToken
export const selectTokenState = (state) => state.credentials.token
export default credentialsSlice.reducer
