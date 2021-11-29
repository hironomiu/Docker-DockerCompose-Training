import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTokenState } from '../features/auth/authSlice'
import {
  fetchTasksAsync,
  selectTasksState,
  selectDeleteTaskState,
  selectUpdateTaskState,
} from '../features/tasks/tasksSlice'
import Task from './Task'

const Main = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectTokenState)
  const tasks = useSelector(selectTasksState)
  const deleteTaskState = useSelector(selectDeleteTaskState)
  const updateTaskState = useSelector(selectUpdateTaskState)

  useEffect(() => {
    dispatch(fetchTasksAsync({ token: token }))
  }, [dispatch, token, deleteTaskState, updateTaskState])

  return (
    <div>
      {tasks.length
        ? tasks.map((task) => <Task key={task.id} task={task} />)
        : null}
    </div>
  )
}

export default Main
