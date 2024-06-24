import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Message, Search, SignIn, SignUp, Splash} from './src/screens';
import {StatusBar, StyleSheet} from 'react-native';

import useGlobal from './src/core/global';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const Stack = createNativeStackNavigator();

const App = () => {
  const initialized = useGlobal(state => state.initialized);
  const authenticated = useGlobal(state => state.authenticated);

  const init = useGlobal(state => state.init);

  useEffect(() => {
    init();
  }, []);

  return (
    <NavigationContainer theme={LightTheme}>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{headerShown: true}}>
        {!initialized ? (
          <>
            <Stack.Screen name="Splash" component={Splash} />
          </>
        ) : !authenticated ? (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{
                headerShown: true,
                headerBackButtonMenuEnabled: false,
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen name="Messages" component={Message} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
