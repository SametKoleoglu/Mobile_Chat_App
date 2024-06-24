import {View, Text} from 'react-native';
import React from 'react';
import Thumbnail from '../common/Thumbnail';
import MessageTypingAnimation from './MessageTypingAnimation';

export default function MessageBubbleFriend({text = '',friend,typing = false}){
  return (
    <View style={{flexDirection: 'row', padding: 5, paddingLeft: 10}}>
      <Thumbnail url={friend.thumbnail} size={40} />
      <View
        style={{
          maxWidth: '75%',
          paddingHorizontal: 16,
          paddingVertical: 12,
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: '#d0d2db',
          marginLeft: 10,
          minHeight: 40,
        }}>
        {typing ? (
          <View style={{flexDirection: 'row'}}>
            <MessageTypingAnimation offset={0} />
            <MessageTypingAnimation offset={1} />
            <MessageTypingAnimation offset={2} />
          </View>
        ) : (
          <Text style={{color: '#202020', fontSize: 15, lineHeight: 20}}>
            {text}
          </Text>
        )}
      </View>
    </View>
  );
}
