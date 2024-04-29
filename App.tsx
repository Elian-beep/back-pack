import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import Main from './src/pages/Main';
import Routes from './Routes';
import { initializeDatabase } from './src/services/sqlite/SQLiteDatabase';

export default function App() {
  initializeDatabase();

  return (
    <SafeAreaView>
      <StatusBar backgroundColor='#d4af9c' />
      <Main />
    </SafeAreaView>
  );
}
