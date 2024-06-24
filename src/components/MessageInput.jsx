import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function MessageInput({message, setMessage, onSend}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10,
      }}>
      <TextInput
        placeholder="Message"
        placeholderTextColor={'#909090'}
        value={message}
        onChangeText={setMessage}
        style={{
          flex: 1,
          paddingHorizontal: 20,
          borderWidth: 1,
          borderRadius: 23,
          borderColor: '#d0d0d0',
          height: 50,
        }}
      />
      <TouchableOpacity onPress={onSend}>
        <FontAwesome
          name="paper-plane"
          size={23}
          color={'#303040'}
          style={{marginHorizontal: 10}}
        />
      </TouchableOpacity>
    </View>
  );
}
