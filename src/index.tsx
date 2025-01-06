import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/main';
import Login from './screens/login';
import Register from './screens/register';
// import OTPVerification from './screens/otp';
import Events from './screens/events';
import DynamicEvent from './screens/dynamic_event';
import SplashScreen from './screens/intro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from './hooks';
import { updateToken } from './store/slice/common';

const Stack = createStackNavigator();

const AppRoute = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('x_a_t');
      if (token) {
        dispatch(updateToken(token)); 
        setInitialRoute('Events');
      } else {
        setInitialRoute('Main'); 
      }
      setIsLoading(false); 
    };

    checkToken();
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute || 'Splash'}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Events"
          component={Events}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DynamicEvent"
          component={DynamicEvent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoute;
