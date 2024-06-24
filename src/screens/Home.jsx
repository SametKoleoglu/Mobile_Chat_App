import React, {useEffect, useLayoutEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Friends, Profile, Requests} from '../screens/';
import useGlobal from '../core/global';
import {Thumbnail} from '../common';

const Bottom = createBottomTabNavigator();

const Home = ({navigation}) => {
  // USE STATE
  const socketConnect = useGlobal(state => state.socketConnect);
  const socketClose = useGlobal(state => state.socketClose);
  const user = useGlobal(state => state.user);

  // FUNCTIONS
  function onSearch() {
    navigation.navigate('Search');
  }

  // USE EFFECT & LAYOUT EFFECT
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    socketConnect();
    return () => {
      socketClose();
    };
  }, []);

  return (
    <Bottom.Navigator
      screenOptions={({route, navigation}) => ({
        headerLeft: () => (
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => navigation.navigate('Profile')}>
            <Thumbnail url={user.thumbnail} size={36} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={onSearch}>
            <FontAwesome
              style={{marginRight: 10}}
              name={'search'}
              size={24}
              color="#404040"
            />
          </TouchableOpacity>
        ),
        tabBarIcon: ({focused, color, size}) => {
          const icons = {
            Requests: 'bell',
            Friends: 'users',
            Profile: 'user',
          };
          const icon = icons[route.name];
          return <FontAwesome name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#202020',
        tabBarShowLabel: false,
      })}>
      <Bottom.Screen name="Requests" component={Requests} />
      <Bottom.Screen name="Friends" component={Friends} />
      <Bottom.Screen name="Profile" component={Profile} />
    </Bottom.Navigator>
  );
};

export default Home;
