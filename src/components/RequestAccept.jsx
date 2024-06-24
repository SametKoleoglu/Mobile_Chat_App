import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import useGlobal from '../core/global';

export default function RequestAccept({item}) {
  const requestAccept = useGlobal(state => state.requestAccept);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#202020',
        paddingHorizontal: 15,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => requestAccept(item.sender.username)}>
      <Text style={{color: '#fff', fontWeight: 'bold'}}>Accept</Text>
    </TouchableOpacity>
  );
}
