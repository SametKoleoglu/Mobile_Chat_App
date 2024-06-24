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
import React, {useLayoutEffect, useState} from 'react';
import {Button, Input, Title} from '../common';
import {api, utils} from '../core';
// import useGlobal from "../core/global";

const SignUp = ({navigation}) => {
  // STATES
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');

  // const login = useGlobal((state) => state.login);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // FUNCTION SIGN UP
  function signUp() {
    // check username
    const failUsername = !username || username.length < 2;
    if (failUsername) {
      setUsernameError('Please enter your username and at least 2 characters');
    }
    // check Firstname
    const failFirstname = !firstname;
    if (failFirstname) {
      setFirstnameError('Please enter your firstname');
    }

    // check Lastname
    const failLastname = !lastname;
    if (failLastname) {
      setLastnameError('Please enter your lastname');
    }

    // check password
    const failPassword = !password || password.length < 8;
    if (failPassword) {
      setPasswordError('Please enter your password and at least 8 characters');
    }

    // check rePassword
    const failRePassword = !rePassword || rePassword !== password;
    if (failRePassword) {
      setRePasswordError(
        'Please re-enter your password and password must match',
      );
    }

    // Break out of this function if there were any issues
    if (
      failUsername ||
      failFirstname ||
      failLastname ||
      failPassword ||
      failRePassword
    ) {
      return;
    }

    // Make Signup request
    api({
      method: 'POST',
      url: '/chat/signup/',
      data: {
        username: username,
        first_name: firstname,
        last_name: lastname,
        password: password,
      },
    })
      .then(response => {
        navigation.navigate('SignIn');
        const userName = response.data.user.username;
        Alert.alert('Success', `Welcome ${userName}!`);
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
      })
      .finally(() => {
        setUsername('');
        setFirstname('');
        setLastname('');
        setPassword('');
        setRePassword('');
      });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="height">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.view1}>
            <Title text="Sign Up" color="#202020" bottom={5} />
            <Input
              title="Username"
              value={username}
              setValue={setUsername}
              error={usernameError}
              setError={setUsernameError}
            />
            <Input
              title="Firstname"
              value={firstname}
              setValue={setFirstname}
              error={firstnameError}
              setError={setFirstnameError}
            />
            <Input
              title="Lastname"
              value={lastname}
              setValue={setLastname}
              error={lastnameError}
              setError={setLastnameError}
            />
            <Input
              title="Password"
              value={password}
              setValue={setPassword}
              error={passwordError}
              setError={setPasswordError}
              secure={true}
            />
            <Input
              title="Re-Password"
              value={rePassword}
              setValue={setRePassword}
              error={rePasswordError}
              setError={setRePasswordError}
              secure={true}
            />
            <Button title="Sign Up" onPress={signUp} />

            <Text style={{textAlign: 'center', marginTop: 40}}>
              Already have an account?{' '}
              <Text style={{color: 'blue'}} onPress={() => navigation.goBack()}>
                Sign In
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
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text1: {
    textAlign: 'center',
    fontSize: 34,
    fontWeight: 'bold',
  },
});

export default SignUp;
