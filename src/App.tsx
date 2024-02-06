import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { User } from './types'
import { createClient, Provider } from 'urql';
import { useQuery } from 'urql'
import { GetUsersDocument } from './graphql/generated'
import { clientd } from './graphql/client';



export default function App() {
  const [results] = useQuery({
    query: GetUsersDocument
  })
  console.log(results)
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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


registerRootComponent(App);

