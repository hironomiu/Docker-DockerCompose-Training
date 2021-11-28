import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTokenState } from '../features/auth/authSlice'
import {
  fetchTasksAsync,
  selectTasksState,
  selectDeleteTaskState,
} from '../features/tasks/tasksSlice'
import Task from './Task'

const Main = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectTokenState)
  const tasks = useSelector(selectTasksState)
  const deleteTaskState = useSelector(selectDeleteTaskState)

  useEffect(() => {
    dispatch(fetchTasksAsync({ token: token }))
  }, [dispatch, token, deleteTaskState])

  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  )
}

export default Main
