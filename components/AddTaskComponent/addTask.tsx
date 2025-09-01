import { StyleSheet, View, FlatList, Button } from 'react-native';
import { useState } from 'react';

import TaskItem from './taskItem';
import TaskInput from './taskInput';
import { addTaskToList } from '../../store/redux/list';
import { useAppDispatch, useAppSelector } from '../../store/redux/hooks';

export default function AddTask() {
  const [isModalShown, setisModalShown] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  function addTaskHandler(enteredTaskText: string) {
    dispatch(addTaskToList(enteredTaskText));
    DismissModal();
  };

  function ShowModal() {
    setisModalShown(true);
  }

  function DismissModal() {
    setisModalShown(false);
  }

  return (
    <View style={styles.appContainer}>
      <Button
        title="Add New Task"
        onPress={ShowModal}
      />
      <TaskInput onAddTask={addTaskHandler} isVisible={isModalShown} dismissModal={DismissModal}/>

      <View>
        <FlatList
          alwaysBounceVertical={false}
          data={tasks}
          renderItem={({ item }) => <TaskItem id={item.id} task={item.task} />}
          contentContainerStyle={{ paddingBottom: 130 }}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
  },

  buttonContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    borderRadius: 6,
  },

  listContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  taskText: {
    padding: 8
  }
});
