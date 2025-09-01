import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  task: string;
}

interface TasksState {
  tasks: Task[];
  nextId: number;
}

const initialState: TasksState = {
  tasks: [],
  nextId: 1,
};



const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskToList: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: state.nextId,
        task: action.payload,
      };
      state.tasks.push(newTask);
      state.nextId += 1;
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    clearAllTasks: (state) => {
      state.tasks = [];
    },
    updateTask: (state, action: PayloadAction<{ id: number; task: string }>) => {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].task = action.payload.task;
      }
    },
  },
});

export const { addTaskToList, removeTask, clearAllTasks, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;