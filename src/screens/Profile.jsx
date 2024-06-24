import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import useGlobal from '../core/global';
import {launchImageLibrary} from 'react-native-image-picker';
import {Thumbnail} from '../common';

function ProfileImage() {
  const uploadThumbnail = useGlobal(state => state.uploadThumbnail);

  const user = useGlobal(state => state.user);

  return (
    <TouchableOpacity
      style={{marginBottom: 20}}
      onPress={() => {
        launchImageLibrary({includeBase64: true}, response => {
          console.log('launch image library : ', response);
          if (response.didCancel) {
            return;
          }
          const file = response.assets[0];

          uploadThumbnail(file);
          Alert.alert('Profile Updated','Thumbnail uploaded!');
        });
      }}>
      <Thumbnail url={user.thumbnail} size={180} />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: '#202020',
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 5,
          borderWidth: 3,
          borderColor: '#fff',
        }}>
        <FontAwesome6 name="pencil" size={24} color="#fff" />
      </View>
    </TouchableOpacity>
  );
}

const ProfileLogout = () => {
  const logout = useGlobal(state => state.logout);

  return (
    <TouchableOpacity
      onPress={() => logout()}
      style={{
        flexDirection: 'row',
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 26,
        backgroundColor: '#202020',
        marginTop: 20,
      }}>
      <FontAwesome6
        name="right-from-bracket"
        size={20}
        color="#d0d0d0"
        style={{marginRight: 10}}
      />
      <Text style={{fontWeight: 'bold', color: '#d0d0d0'}}>Logout</Text>
    </TouchableOpacity>
  );
};

const Profile = () => {
  const user = useGlobal(state => state.user);

  return (
    <View style={styles.container}>
      <ProfileImage />
      <Text style={styles.text}>{user.name}</Text>
      <Text style={styles.text2}>@{user.username}</Text>
      <ProfileLogout />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 99,
    paddingTop: 100,
  },
  text: {
    textAlign: 'center',
    color: '#303030',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  text2: {
    textAlign: 'center',
    fontSize: 15,
    color: '#606060',
  },
});

export default Profile;
