/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,

  useColorScheme,
  View,
} from 'react-native';




import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import SkorkuLivenessSDK from './react-native-skorku-sdk';


function App(): JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  const [test, setTest] = useState(false)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const handlePress = async () => {
    setTest(true);

  };

  return (
    <>
      {
        test == true ?
          <SkorkuLivenessSDK
            sdkKey={'74ac47a9baa2701c'}
            secretKey={'74ac47a9baa2701c'}
            skorkuKey={'key'}
            skorkusecret={'secret'}
            onExited={setTest} />

          : < SafeAreaView style={backgroundStyle} >
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={backgroundStyle}>
              <Header />
              <View
                style={{
                  backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                <Button title="Open App" onPress={handlePress} />

              </View>
            </ScrollView>
          </SafeAreaView >
      }
    </>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
