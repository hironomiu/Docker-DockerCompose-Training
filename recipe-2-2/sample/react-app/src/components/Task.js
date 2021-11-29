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
    <>
      <tr>
        <td className="px-2 py-2">
          <p>{task.title}</p>
        </td>
        <td className="px-2 py-2">
          <p>{task.task}</p>
        </td>
        <td className="px-2 py-2">
          <p>{task.status_name}</p>
        </td>
        <td className="px-2 py-2">
          <button
            className="bg-gray-600 text-white font-bold mx-2 py-2 px-4 rounded"
            onClick={() => {
              setUpdateModalOn(true)
            }}
          >
            修正
          </button>
        </td>
        <td className="px-2 py-2">
          <button
            className="bg-gray-600 text-white font-bold mx-2 py-2 px-4 rounded"
            onClick={() => {
              setDeleteModalOn(true)
            }}
          >
            削除
          </button>
        </td>

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
      </tr>
    </>
  )
}

export default Task
