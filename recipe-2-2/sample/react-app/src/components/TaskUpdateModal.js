import { Fragment, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { RefreshIcon } from '@heroicons/react/outline'
import { updateTaskAsync } from '../features/tasks/tasksSlice'

const TaskUpdateModal = ({ setUpdateModalOn, credentials }) => {
  const [open, setOpen] = useState(true)
  const [taskState, setTaskState] = useState({
    id: credentials.task.id,
    title: credentials.task.title,
    task: credentials.task.task,
    status: credentials.task.status,
    status_name: credentials.task.status_name,
  })
  const cancelButtonRef = useRef(null)
  const dispatch = useDispatch()

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto font-mono"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false)
          setUpdateModalOn(false)
        }}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                    <RefreshIcon
                      className="h-6 w-6 text-gray-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Task Record Update ?
                    </Dialog.Title>
                    <div className="mt-2">
                      <label
                        className="block text-grey-darker pt-2 text-sm font-bold mb-2"
                        htmlFor="title"
                      >
                        タイトル
                      </label>
                      <input
                        id="title"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        type="text"
                        value={taskState.title}
                        onChange={(e) =>
                          setTaskState({ ...taskState, title: e.target.value })
                        }
                      />
                      <label
                        className="block text-grey-darker pt-2 text-sm font-bold mb-2"
                        htmlFor="task"
                      >
                        タスク詳細
                      </label>
                      <textarea
                        id="task"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        type="text"
                        value={taskState.task}
                        onChange={(e) =>
                          setTaskState({ ...taskState, task: e.target.value })
                        }
                      />
                      <label
                        className="block text-grey-darker pt-2 text-sm font-bold mb-2"
                        htmlFor="task"
                      >
                        ステータスs
                      </label>
                      <select
                        name="status"
                        id="status"
                        value={taskState.status}
                        onChange={(e) =>
                          setTaskState({ ...taskState, status: e.target.value })
                        }
                      >
                        <option value="1">未着手</option>
                        <option value="2">着手中</option>
                        <option value="3">完了</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(
                      updateTaskAsync({
                        csrfToken: credentials.csrfToken,
                        task: taskState,
                      })
                    )
                    setOpen(false)
                    setUpdateModalOn(false)
                  }}
                >
                  修正
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setOpen(false)
                    setUpdateModalOn(false)
                  }}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default TaskUpdateModal
