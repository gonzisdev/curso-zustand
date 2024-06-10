import { useState } from "react"
import { useTaskStore } from "../stores"
import Swal from "sweetalert2"
import type { TaskStatus } from "../types"

type useTaskHookProps = {
    status: TaskStatus
}

export const useTaskHook = ({status}: useTaskHookProps) => {

    const isDragging = useTaskStore(state => !!state.dragginTaskId)
    const onTaskDrop = useTaskStore(state => state.onTaskDrop)
    const addTask = useTaskStore(state => state.addTask)
    const [onDragOver, setOnDragOver] = useState(false)
  
    const handleAddTask = async () => {
      const resp = await Swal.fire({
        title: 'Nueva tarea',
        input: 'text',
        inputLabel: 'Nombre de la tarea:',
        inputPlaceholder: 'Introduce el nombre de la tarea',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          if (!value) {
            return 'Debes de añadir un nombre para la tarea'
          }
        },
      })
      if (resp.isConfirmed) {
        addTask(resp.value, status)
      }
    }
  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setOnDragOver(true)
    }
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setOnDragOver(false)
    }
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setOnDragOver(false)
      onTaskDrop(status)
    }

  return {
    isDragging,
    onDragOver,
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop
  }
}
