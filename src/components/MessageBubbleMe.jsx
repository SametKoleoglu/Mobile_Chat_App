import {View, Text} from 'react-native';
import React from 'react';
import Thumbnail from '../common/Thumbnail';

export default function MessageBubbleMe({text}) {
  return (
    <View style={{flexDirection: 'row', padding: 5, paddingRight: 10}}>
      <View style={{flex: 1}} />
      <View
        style={{
          maxWidth: '75%',
          paddingHorizontal: 16,
          paddingVertical: 12,
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: '#303040',
          marginRight: 10,
          minHeight: 40,
        }}>
        <Text style={{color: '#fff', fontSize: 15, lineHeight: 20}}>
          {text}
        </Text>
      </View>
    </View>
  );
}
