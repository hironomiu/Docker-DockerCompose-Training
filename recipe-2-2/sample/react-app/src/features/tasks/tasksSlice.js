import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as C from '../../config/index'

const initialState = {
  tasksStatus: 'idle',
  value: [],
}

export const fetchTasksAsync = createAsyncThunk(
  'tasks/fetch',
  async (credentials) => {
    const res = await fetch(C.URL + '/api/v1/tasks', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${credentials.token}`,
      },
    })
    const data = await res.json()
    return data
  }
)

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.tasksStatus = 'loading'
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.tasksStatus = 'idle'
        state.value = action.payload
      })
  },
})

export const selectTasksState = (state) => state.tasks.value
export default tasksSlice.reducer
