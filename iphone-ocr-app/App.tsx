import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import ResultScreen from './screens/ResultScreen';

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Result: { image: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        
        {/* Home */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />

        {/* Camera - abre de baixo em tela cheia */}
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
          options={{
            headerShown: false,
            presentation: 'fullScreenModal',  // 🔥 força vertical pura
            animation: 'slide_from_bottom',
            gestureDirection: 'vertical'
          }} 
        />

        {/* Result - também modal em tela cheia */}
        <Stack.Screen 
          name="Result" 
          component={ResultScreen} 
          options={{
            headerShown: false,
            presentation: 'fullScreenModal',  // 🔥 mantém consistência
            animation: 'slide_from_bottom',
            gestureDirection: 'vertical'
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
