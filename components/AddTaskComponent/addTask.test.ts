import tasksReducer, { addTaskToList, removeTask, clearAllTasks, updateTask, Task } from '../../store/redux/list';

interface TasksState {
  tasks: Task[];
  nextId: number;
}

describe('Tasks Redux', () => {
  const initialState: TasksState = {
    tasks: [],
    nextId: 1,
  };

  it('Debe agregar un task al listado', () => {
    const taskText = 'Test task';
    const action = addTaskToList(taskText);
    const state = tasksReducer(initialState, action);

    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0]).toEqual({
      id: 1,
      task: taskText,
    });
    expect(state.nextId).toBe(2);
  });
});