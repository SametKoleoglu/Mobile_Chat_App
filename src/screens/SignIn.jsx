import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Button, Input, Title} from '../common';
import {api, utils} from '../core';
import useGlobal from '../core/global';

const SignIn = ({navigation}) => {
  // states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const login = useGlobal(state => state.login);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // SIGN IN FUNCTION
  function signIn() {
    // check username
    const failUsername = !username;

    if (failUsername) {
      setUsernameError('Username not provided!');
    }

    // check password
    const failPassword = !password;
    if (failPassword) {
      setPasswordError('Password not provided!');
    }

    // Break out of this function if there were any issues
    if (failUsername || failPassword) {
      return;
    }

    // Make signin request

    api({
      method: 'POST',
      url: '/chat/signin/',
      data: {
        username: username,
        password: password,
      },
    })
      .then(response => {
        const credentials = {
          username: username,
          password: password,
        };
        login(credentials, response.data.user, response.data.tokens);
        Alert.alert('Success', 'Sign in successful! Redirecting to Profile...');
        navigation.navigate('Profile');
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.view1}>
            <Title text="Realtime Chat App" color="#202020" />
            <Input
              title="Username"
              value={username}
              setValue={setUsername}
              error={usernameError}
              setError={setUsernameError}
              secure={false}
            />
            <Input
              title="Password"
              value={password}
              setValue={setPassword}
              error={passwordError}
              setError={setPasswordError}
              secure={true}
            />
            <Button title="Sign In" onPress={signIn} />

            <Text style={{textAlign: 'center', marginTop: 40}}>
              Don't have an account?{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => navigation.navigate('SignUp')}>
                Sign Up
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 50,
    gap: 20,
  },
});

export default SignIn;
