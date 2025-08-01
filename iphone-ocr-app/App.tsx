import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import ResultScreen from './screens/ResultScreen';

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Result: { image: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
          options={{
            headerShown: false,
            gestureDirection: 'vertical',
            presentation: 'modal',
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
          }} 
        />

        <Stack.Screen 
          name="Result" 
          component={ResultScreen} 
          options={{
            gestureDirection: 'vertical',
            presentation: 'modal',
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
