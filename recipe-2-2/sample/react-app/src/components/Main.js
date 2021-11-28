import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTokenState } from '../features/auth/authSlice'
import { fetchTasksAsync, selectTasksState } from '../features/tasks/tasksSlice'

const Main = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectTokenState)
  const tasks = useSelector(selectTasksState)

  useEffect(() => {
    dispatch(fetchTasksAsync({ token: token }))
  }, [dispatch, token])

  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="mt-2">
          {task.title}:{task.task}:{task.status}
        </div>
      ))}
    </>
  )
}

export default Main
