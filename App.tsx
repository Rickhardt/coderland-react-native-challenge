import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import HomeScreen from './components/MainScreen/mainScreen';
import { store } from './store/redux/store';


export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 80,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: '30%',
    marginVertical: 10,
    borderRadius: 6,
  }
});
