import { StateCreator, create } from "zustand"
import { v4 as uuidv4 } from 'uuid'
import type { Task, TaskStatus } from "../../types"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
//import { produce } from "immer"

type TaskState = {
    tasks: Record<string, Task> // {[key: string]: Task}
    dragginTaskId?: Task['id']
    getTaskByStatus: (status: TaskStatus) => Task[]
    addTask: (title: Task['title'], status: TaskStatus) => void
    setDraggingTaskId: (taskId: Task['id']) => void
    removeDraggingTaskId: () => void
    changeTaskStatus: (taskId: Task['id'], status: TaskStatus) => void
    onTaskDrop: (status: TaskStatus) => void
}

const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
    tasks: {
        'ABC-1' : {id: 'ABC-1', title: 'Task 1', status: 'open'},
        'ABC-2' : {id: 'ABC-2', title: 'Task 2', status: 'in-progress'},
        'ABC-3' : {id: 'ABC-3', title: 'Task 3', status: 'open'},
        'ABC-4' : {id: 'ABC-4', title: 'Task 4', status: 'open'},
    },
    dragginTaskId: undefined,
    getTaskByStatus: (status) => {
        const tasks = get().tasks
        return Object.values(tasks).filter(task => task.status === status)
    },
    addTask: (title, status) => {
        const newTask = {id: uuidv4(), title, status}
        //? Con middleware immer
        set(state => {
            state.tasks[newTask.id] = newTask
        })
        //? Requiere npm install immer
        // set(produce((state: TaskState) => {
        //     state.tasks[newTask.id] = newTask
        // }))
        //? Forma nativa de Zustand
        // set((state) => ({
        //     tasks: {
        //         ...state.tasks,
        //         [newTask.id]: newTask
        // }}))
    },
    setDraggingTaskId: (taskId) => set((state) => ({
        dragginTaskId: taskId
    })),
    removeDraggingTaskId: () => set((state) => ({
        dragginTaskId: undefined
    })),
    changeTaskStatus: (taskId, status) => set((state) => ({
        tasks: {
            ...state.tasks,
            [taskId]: {
                ...state.tasks[taskId],
                status: status
            }
        }
    })),
    onTaskDrop: (status) => {
        const taskId = get().dragginTaskId
        if (!taskId) return
        get().changeTaskStatus(taskId, status)
        get().removeDraggingTaskId()
    }
})

export const useTaskStore = create<TaskState>()(
    devtools(
        persist(
            immer(storeApi), {name: 'task-store'})
    )
)