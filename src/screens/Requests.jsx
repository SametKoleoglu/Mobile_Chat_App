import {
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import React from 'react';
import useGlobal from '../core/global';
import {Empty} from '../common';
import {RequestRow} from '../components';

const Requests = () => {
  const requestList = useGlobal(state => state.requestList);

  if (requestList === null) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  if (requestList.length === 0) {
    return <Empty icon={'bell'} message={'No requests'} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={requestList}
        renderItem={({item, index}) => <RequestRow key={index} item={item} />}
        keyExtractor={item => item.sender.username}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Requests;
