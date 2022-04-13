import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';

import Button from '../components/Button';
import InputField from '../components/InputField';
import ErrorMessage from '../components/ErrorMessage';
import { auth, db } from '../config/firebase';
import { AuthenticatedUserContext } from '../context/AuthenticatedUserProvider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  const { user } = useContext(AuthenticatedUserContext);
  const [nickname, setNickname] = useState(user?.displayName);

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
        console.log(error.message);
      setLoginError(error.message);
    }
  };

  const onProfileUpdate = async () => {
    try {
      if (name !== user?.displayName) {
        user?.updateProfile({displayName: name});
      }
    } catch (error) {
        console.log(error.message);
        setLoginError(error.message);
    }
  };

  if (user) {
    const myUser = db.collection('users').doc(user.uid).get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data().nickname);
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    return (
      <View style={styles.container}>
        <StatusBar style='dark-content' />
        <Text style={styles.title}>Welcome {user.displayName ?? user.email}</Text>
        <InputField
          inputStyle={{
            fontSize: 14
          }}
          containerStyle={{
            backgroundColor: '#fff',
            marginBottom: 20
          }}
          placeholder='Enter name'
          autoCapitalize='none'
          value={name}
          onChangeText={text => setName(text)}
        />
        {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
        <Button
          onPress={onProfileUpdate}
          backgroundColor='#f57c00'
          title='Update Profile'
          tileColor='#fff'
          titleSize={20}
          containerStyle={{
            marginBottom: 24
          }}
        />
        <Button
          onPress={() => auth.signOut()}
          backgroundColor='#ff0000'
          title='Logout'
          tileColor='#fff'
          titleSize={20}
          containerStyle={{
            marginBottom: 24
          }}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <Text style={styles.title}>Login</Text>
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='email'
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='lock'
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType='password'
        rightIcon={rightIcon}
        value={password}
        onChangeText={text => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      <Button
        onPress={onLogin}
        backgroundColor='#f57c00'
        title='Login'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24
        }}
      />
      <RNButton
        onPress={() => navigation.navigate('Signup')}
        title='Go to Signup'
        color='#fff'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  }
});