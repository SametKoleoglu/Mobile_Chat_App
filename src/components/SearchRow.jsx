import {View, Text} from 'react-native';
import React from 'react';
import {Cell, Thumbnail} from '../common';
import SearchButton from './SearchButton';

const SearchRow = ({user}) => {
  return (
    <Cell>
      <Thumbnail url={user.thumbnail} size={80} />
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <Text style={{color: '#202020', marginBottom: 5, fontWeight: 'bold'}}>
          {user.name}
        </Text>
        <Text style={{color: '#606060'}}>@{user.username}</Text>
      </View>

      <SearchButton user={user} />
    </Cell>
  );
};

export default SearchRow;
