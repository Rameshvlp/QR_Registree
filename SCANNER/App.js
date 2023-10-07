// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScannerScreen from './ScannerScreen';
import DisplayScreen from './DisplayScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Scanner">
        <Stack.Screen name="Welcome To PSG TECH" component={ScannerScreen} />
        <Stack.Screen name="DisplayScreen" component={DisplayScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
