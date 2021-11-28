import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCsrfTokenState } from '../features/auth/authSlice'
import { deleteTaskAsync } from '../features/tasks/tasksSlice'

const Task = ({ task }) => {
  const csrfToken = useSelector(selectCsrfTokenState)
  const dispatch = useDispatch(deleteTaskAsync)
  return (
    <div className="py-3">
      <span className="mr-3">
        タスク名：{task.title}、内容：{task.task}、ステータス：{task.status}
      </span>
      <button
        className="bg-gray-600 text-white font-bold py-2 px-4 rounded"
        onClick={(e) => {
          e.preventDefault()
          dispatch(deleteTaskAsync({ csrfToken: csrfToken, id: task.id }))
        }}
      >
        削除
      </button>
    </div>
  )
}

export default Task
