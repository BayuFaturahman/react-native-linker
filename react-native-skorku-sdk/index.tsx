import React, { useContext, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, View } from 'react-native';
import AppRouter from './src/router/router';
import * as variables from './src/constants/variables';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { baseUrl } from './src/constants/baseUrl';
import SignUpProvider, { SignUpContext } from './src/context/SignUpContext';

interface Props {
  sdkKey: string,
  secretKey: string,
  skorkuKey: string,
  skorkusecret: string,
  onExited(v: boolean): any;
}

function SkorkuLivenessSDK(props: Props): JSX.Element {
  const {
    sdkKey,
    secretKey,
    skorkuKey,
    skorkusecret,
    onExited,
  } = props;

  useEffect(() => {
    (async () => {
      await EncryptedStorage.setItem("sdkKey", sdkKey);
      await EncryptedStorage.setItem("secretKey", secretKey);
      await EncryptedStorage.setItem("skorkuKey", skorkuKey);
      await EncryptedStorage.setItem("skorkusecret", skorkusecret);

      var utf8 = require('utf8');
      const Buffer = require("buffer").Buffer;
      let encodedAuth = new Buffer(utf8.encode(`${skorkuKey}:${skorkusecret}`)).toString("base64");
      axios.defaults.headers.post['sdk-auth'] = encodedAuth;
      axios.defaults.baseURL = baseUrl;
      axios.defaults.timeout = 60000

      console.log('init')
    })();

  }, []);

  return (
    <>
      <SignUpProvider>
        <App onExited={(v) => onExited(!v)} />
      </SignUpProvider>
    </>
  );
};

interface AppProps {
  onExited(v: boolean): any;
}

function App(props: AppProps): JSX.Element {
  const {
    onExited,
  } = props;

  const cRegister = useContext(SignUpContext);

  useEffect(() => {
    onExited(cRegister?.data.is_exited ?? false)
  }, [cRegister])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <StatusBar
        backgroundColor={variables.colors.primary}
      />
      <AppRouter />
    </KeyboardAvoidingView>
  );
}

export default SkorkuLivenessSDK;