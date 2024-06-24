import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {Thumbnail} from '../common';

export default function MessageHeader({friend}) {
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <Thumbnail url={friend.thumbnail} size={30} />
      <Text
        style={{
          fontWeight: 'bold',
          marginLeft: 10,
          fontSize: 18,
          color:'#202020'
        }}>
        {friend.username}
      </Text>
    </SafeAreaView>
  );
}
