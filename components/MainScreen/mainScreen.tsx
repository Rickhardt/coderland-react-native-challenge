import { StyleSheet, View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';


import AddTask from '../AddTaskComponent/addTask';
import CustomList from '../ListComponent/listComponent';

type RootStackParamList = {
    Home: undefined;
    TaskAddition: undefined;
    ShowList: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function MainScreen({ navigation }: any) {
    return (
        <View style={styles.appContainer}>
            <View style={styles.button}>
                <Button onPress={() => navigation.navigate('TaskAddition')}>Task</Button>
            </View>
            
            <View style={styles.button}>
                <Button onPress={() => navigation.navigate('ShowList')}>List</Button>
            </View>
        </View>
  );
}

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={MainScreen} />
            <Stack.Screen name="TaskAddition" component={AddTask} />
            <Stack.Screen name="ShowList" component={CustomList} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 80,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    width: '40%',
    marginVertical: 10,
    borderRadius: 6,
  },

  buttonText: {
    fontSize: 20
  }
});