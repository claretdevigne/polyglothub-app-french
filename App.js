import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Core from './core/Core';
import Auth from "./auth/Auth";
import { store } from './reducers/store';
import { Provider, useSelector } from 'react-redux';


export default function App() {

  const [logged, setLogged] = useState(true)

  return (
    <Provider store={ store }>
      <View style={styles.container}>
        {
          (logged) ?
          <Core/> :
          <Auth/>
        }
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
