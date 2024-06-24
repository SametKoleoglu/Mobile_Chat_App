import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Cell, Thumbnail} from '../common';
import utils from '../core/utils';

export default function FriendRow({navigation, item}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Messages', item);
      }}>
      <Cell>
        <Thumbnail url={item.friend.thumbnail} size={75} />
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <Text style={{color: '#202020', marginBottom: 5, fontWeight: 'bold'}}>
            {item.friend.name}
          </Text>
          <Text style={{color: '#606060'}}>
            {item.preview}
            <Text style={{color: '#909090', fontSize: 12}}>
              {'  '}
              {utils.formatTime(item.updated)}
            </Text>
          </Text>
        </View>
      </Cell>
    </TouchableOpacity>
  );
}
