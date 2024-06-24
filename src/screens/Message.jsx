import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  InputAccessoryView,
  FlatList,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {MessageHeader, MessageInput, MesssageBubble} from '../components';
import useGlobal from '../core/global';

const Message = ({navigation, route}) => {
  const [message, setMessage] = useState('');

  // Hooks
  const messagesList = useGlobal(state => state.messagesList);
  const messagesNext = useGlobal(state => state.messagesNext);

  const messageSend = useGlobal(state => state.messageSend);
  const messageList = useGlobal(state => state.messageList);
  const messageType = useGlobal(state => state.messageType);

  const friend = route.params.friend;
  const connectionId = route.params.id;

  // Update the Header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <MessageHeader friend={friend} />,
    });
  }, []);

  useEffect(() => {
    messageList(connectionId);
  }, []);

  // FUNCTIONS
  function onSend() {
    const cleaned = message.replace(/\s+/g, ' ').trim();

    if (cleaned.length === 0) return;
    messageSend(connectionId, cleaned);
    setMessage('');
  }

  function onType(value) {
    setMessage(value);
    messageType(friend.username);
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.view1}>
          <FlatList
            data={[{id: -1}, ...messagesList]}
            keyExtractor={item => item.id}
            automaticallyAdjustKeyboardInsets={true}
            contentContainerStyle={{paddingTop: 20}}
            showsVerticalScrollIndicator={false}
            inverted={true}
            onEndReached={() => {
              if (messagesNext) {
                messageList(connectionId, messagesNext);
              }
            }}
            renderItem={({item, index}) => (
              <MesssageBubble index={index} message={item} friend={friend} />
            )}
          />
        </View>


      {Platform.OS === 'ios' ? (
        <InputAccessoryView>
          <MessageInput message={message} setMessage={onType} onSend={onSend} />
        </InputAccessoryView>
      ) : (
        <MessageInput message={message} setMessage={onType} onSend={onSend} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1: {
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 65 : 0,
  },
});

export default Message;
