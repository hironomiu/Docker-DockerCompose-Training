import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCsrfTokenState,
  logout,
  selectTokenState,
} from '../features/auth/authSlice'
import { fetchTasksAsync, selectTasksState } from '../features/tasks/tasksSlice'

const Main = () => {
  const dispatch = useDispatch()
  const csrfToken = useSelector(selectCsrfTokenState)
  const token = useSelector(selectTokenState)
  const tasks = useSelector(selectTasksState)

  useEffect(() => {
    dispatch(fetchTasksAsync({ token: token }))
  }, [dispatch, token])

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
          dispatch(logout({ csrfToken: csrfToken }))
        }}
      >
        logout
      </button>
      <br />
      <br />
      {tasks.map((task) => (
        <div key={task.id}>
          {task.title}:{task.task}:{task.status}
        </div>
      ))}
    </>
  )
}

export default Main
