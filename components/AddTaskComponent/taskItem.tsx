import { StyleSheet, Text, View } from 'react-native';

export default function TaskItem( props: {id: number, task: string} ) {
    return(
        <View style={styles.listContainer}>
            <Text style={styles.taskText}  key={props.id}>{props.task}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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