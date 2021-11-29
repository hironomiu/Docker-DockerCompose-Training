import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCsrfTokenState } from '../features/auth/authSlice'
import TaskDeleteModal from './TaskDeleteModal'
import TaskUpdateModal from './TaskUpdateModal'

const Task = ({ task }) => {
  const csrfToken = useSelector(selectCsrfTokenState)
  const [updateModalOn, setUpdateModalOn] = useState(false)
  const [deleteModalOn, setDeleteModalOn] = useState(false)

  return (
    <div className="py-3">
      <span className="mr-3">
        タスク名：{task.title}、内容：{task.task}、ステータス：
        {task.status_name}
      </span>
      <button
        className="bg-gray-600 text-white font-bold mx-2 py-2 px-4 rounded"
        onClick={() => {
          setUpdateModalOn(true)
        }}
      >
        修正
      </button>
      <button
        className="bg-gray-600 text-white font-bold mx-2 py-2 px-4 rounded"
        onClick={() => {
          setDeleteModalOn(true)
        }}
      >
        削除
      </button>
      {updateModalOn ? (
        <TaskUpdateModal
          setUpdateModalOn={setUpdateModalOn}
          credentials={{ csrfToken: csrfToken, task: { ...task } }}
        />
      ) : null}
      {deleteModalOn ? (
        <TaskDeleteModal
          setDeleteModalOn={setDeleteModalOn}
          credentials={{ csrfToken: csrfToken, id: task.id }}
        />
      ) : null}
    </div>
  )
}

export default Task
