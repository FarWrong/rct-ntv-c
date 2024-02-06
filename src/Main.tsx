import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { User } from './types'
import { createClient, Provider } from 'urql';
import { useQuery } from 'urql'
import { GetUsersDocument } from './graphql/generated'
import { clientd } from './graphql/client';
import App from './App';


export default function Main() {
  return (
    <Provider value={clientd}>
      <App />
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


registerRootComponent(Main);

