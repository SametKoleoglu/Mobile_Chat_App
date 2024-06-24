import {View, Text} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Empty = ({icon, message, centered = true}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingVertical: 120,
        justifyContent: centered ? 'center' : 'flex-start',
      }}>
      <FontAwesome name={icon} size={90} color={'#d0d0d0'} />
      <Text style={{color: '#c3c3c3', fontSize: 16,marginVertical: 12}}>{message}</Text>
    </View>
  );
};

export default Empty;
