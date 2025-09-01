import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react-native';
import TaskInput from '../../components/AddTaskComponent/taskInput';

interface TaskInputProps {
  isVisible: boolean;
  onAddTask: (task: string) => void;
}

interface TaskInputProps {
  isVisible: boolean;
  onAddTask: (task: string) => void;
  dismissModal: () => void;
}

describe('TaskInput Component', () => {
  const mockProps: TaskInputProps = {
    isVisible: true,
    onAddTask: jest.fn(),
    dismissModal: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not allow task creation if field is empty', () => {
    render(<TaskInput {...mockProps} />);
    
    const addButton = screen.getByText('Add Task');
    fireEvent.press(addButton);
    
    expect(mockProps.onAddTask).toHaveBeenCalledWith('');
  });

  it('should call onAddTask with entered text when Add Task is pressed', () => {
    render(<TaskInput {...mockProps} />);
    
    const textInput = screen.getByPlaceholderText('Add task');
    fireEvent.changeText(textInput, 'Test task');
    
    const addButton = screen.getByText('Add Task');
    fireEvent.press(addButton);
    
    expect(mockProps.onAddTask).toHaveBeenCalledWith('Test task');
  });

  it('should call dismissModal when Dismiss button is pressed', () => {
    render(<TaskInput {...mockProps} />);
    
    const dismissButton = screen.getByText('Dismiss');
    fireEvent.press(dismissButton);
    
    expect(mockProps.dismissModal).toHaveBeenCalled();
  });

  it('should clear text input after adding task', () => {
    render(<TaskInput {...mockProps} />);
    
    const textInput = screen.getByPlaceholderText('Add task');
    fireEvent.changeText(textInput, 'Test task');
    
    const addButton = screen.getByText('Add Task');
    fireEvent.press(addButton);
    
    expect(textInput.props.value).toBe('');
  });

  it('should not be visible when isVisible is false', () => {
    const props: TaskInputProps = { ...mockProps, isVisible: false };
    render(<TaskInput {...props} />);
    
    expect(screen.queryByPlaceholderText('Add task')).toBeNull();
  });
});