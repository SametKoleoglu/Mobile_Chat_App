import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Empty} from '../common';
import {SearchRow} from '../components';
import useGlobal from '../core/global';

const Search = ({navigation}) => {
  const [query, setQuery] = useState('');

  const searchList = useGlobal(state => state.searchList);
  const searchUsers = useGlobal(state => state.searchUsers);

  useEffect(() => {
    searchUsers(query);
  }, [query]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder="Search"
            placeholderTextColor={'grey'}
          />
          <FontAwesome
            name="search"
            size={20}
            color={'#505050'}
            style={styles.icon}
          />
        </View>
      </View>

      {searchList == null ? (
        <Empty icon={'search'} message="Search for friends" centered={false} />
      ) : searchList.length === 0 ? (
        <Empty
          icon={'warning'}
          message={'No results found for "' + query + '" '}
          centered={false}
        />
      ) : (
        <FlatList
          data={searchList}
          renderItem={({item}) => <SearchRow user={item} />}
          keyExtractor={item => item.username}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderColor: '#f0f0f0',
    borderWidth: 1,
  },
  input: {
    backgroundColor: '#e1e2e4',
    borderRadius: 26,
    height: 48,
    padding: 16,
    fontSize: 15,
    paddingLeft: 50,
  },
  icon: {
    position: 'absolute',
    left: 22,
    display: 'flex',
    marginVertical: 12,
  },
});

export default Search;
