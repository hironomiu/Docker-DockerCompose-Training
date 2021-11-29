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
    <div className="block my-5 mx-5">
      {tasks.length ? (
        <table className="">
          <thead>
            <tr className="border-b-2">
              <th className="px-2 py-2">タスク名</th>
              <th className="px-2 py-2 w-80">内容</th>
              <th className="px-2 py-2">ステータス</th>
              <th className="px-2 py-2">修正</th>
              <th className="px-2 py-2">削除</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      ) : null}
      <div className="mt-2 mb-5">
        <button className="bg-gray-600 text-white py-3 px-6 text-l rounded">
          新規登録
        </button>
      </div>
    </div>
  )
}

export default Main
