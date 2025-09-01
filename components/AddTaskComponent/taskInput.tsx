import { StyleSheet, View, Button, TextInput, Modal } from 'react-native';
import { useState } from 'react';

export default function TaskInput(props: any) {
    const [enteredTaskText, setEnteredTaskText] = useState<string>('');
    
    function taskInputHandler(enteredText: string): void {
        if(enteredText === '') return;

        setEnteredTaskText(enteredText);
    };

    function addTaskHandler() {
        props.onAddTask(enteredTaskText);
        setEnteredTaskText('');
    }

    return(
        <Modal visible={props.isVisible} animationType='slide'>
            <View style={styles.container}>
                <TextInput
                placeholder="Add task"
                onChange={(e) => taskInputHandler(e.nativeEvent.text)}
                value={enteredTaskText}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title="Add Task" onPress={addTaskHandler} /></View>
                    <View style={styles.button}><Button title="Dismiss" onPress={props.dismissModal}  /></View>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    borderRadius: 6,
  },

  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    borderRadius: 6,
  },

  button: {
    width: '30%',
    marginHorizontal: 8,
    borderRadius: 6,
  }
});