import React, { useState } from 'react';
import {Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useGlobal from '../core/global';

export default function SearchButton({user}) {
  if (user.status === 'connected') {
    return (
      <FontAwesome
        name="check-circle"
        size={24}
        color={'#20d080'}
        style={{marginRight: 10}}
      />
    );
  }


  const requestConnect = useGlobal(state => state.requestConnect)

  const data = {};

  switch (user.status) {
    case 'no-connection':
      data.text = 'Connect';
      data.disabled = false;
      data.onPress = () => requestConnect(user.username);
      break;
    case 'pending-them':
      data.text = 'Pending';
      data.disabled = true;
      data.onPress = () => {};
      break;
    case 'pending-me':
      data.text = 'Accept';
      data.disabled = false;
      data.onPress = () => {};
      break;
    default:
      break;
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: data.disabled ? '#505055' : '#202020',
        paddingHorizontal: 16,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
      }}
      disabled={data.disabled}
      onPress={data.onPress}>
      <Text
        style={{color: data.disabled ? '#808080' : '#fff', fontWeight: 'bold'}}>
        {data.text}
      </Text>
    </TouchableOpacity>
  );
}
