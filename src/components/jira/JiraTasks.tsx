import { SingleTask } from './SingleTask'
import type { Task, TaskStatus } from '../../types'
import { IoAddOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'
import { useTaskHook } from '../../hooks/useTaskHook'

type Props = {
  title: string
  tasks: Task[]
  status: TaskStatus
}

export const JiraTasks = ({ title, status, tasks }: Props) => {

  const { isDragging, onDragOver, handleAddTask, handleDragOver, handleDragLeave, handleDrop } = useTaskHook({status})

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`!text-black border-4 ${isDragging ? 'border-blue-500 border-dotted': ''} ${onDragOver ? 'border-green-500 border-dotted': ''} relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]`}
    >
      {/* Task Header */ }
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={ { fontSize: '50px' } } />
            </span>
          </div>
          <h4 className="ml-4 text-xl font-bold text-navy-700">{ title }</h4>
        </div>
        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>
      {/* Task Items */ }
      <div className="h-full w-full">
        {
          tasks.map(task => (
            <SingleTask key={task.id} task={task}/>
          ))
        }
      </div>
    </div>
  )
}