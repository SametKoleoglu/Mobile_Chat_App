import React from 'react';
import {Cell, Thumbnail} from '../common';
import {View, StyleSheet, Text} from 'react-native';
import {RequestAccept} from './';
import utils from '../core/utils';

const RequestRow = ({item}) => {
  const message = 'Request to connect with you';
  // const time = '1m ago';

  return (
    <Cell>
      <Thumbnail url={item.sender.thumbnail} size={76} />
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <Text style={{color: '#202020', marginBottom: 5, fontWeight: 'bold'}}>
          {item.sender.name}
        </Text>
        <Text style={{color: '#606060'}}>
          {message}
          <Text style={{color: '#909090', fontSize: 12}}>
            {' '}
            - {utils.formatTime(item.created)}
          </Text>
        </Text>
      </View>

      <RequestAccept item={item} />
    </Cell>
  );
};

export default RequestRow;
