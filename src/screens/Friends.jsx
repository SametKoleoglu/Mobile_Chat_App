import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {FriendRow} from '../components';
import useGlobal from '../core/global';
import {Empty} from '../common';

const Friends = ({navigation}) => {
  const friendList = useGlobal(state => state.friendList);

  if (friendList === null) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  if (friendList.length === 0) {
    return <Empty icon={'group'} message={'No friends'} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={friendList}
        renderItem={({item, index}) => (
          <FriendRow key={index} item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.friend.username}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Friends;
