/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,

  useColorScheme,
  View,
} from 'react-native';

import RNFS from 'react-native-fs';


import { RNLauncherKitHelper } from 'react-native-launcher-kit';

import {
  Colors,

  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const inputData = {
    sdkKey: '74ac47a9baa2701c',
    secretKey: '9e7bb8eb7f1fa046',
    packageName: 'com.cbi.ekyc',
    skorkuKey: 'key',
    skorkusecret: 'secret',
    nik: '1234123412341234',
    bloodType: 'S',
    religion: 'ISLAM',
    gender: 'LAKI-LAKI',
    dob: '2000-01-01',
    pob: 'JAKARTA1',
    province: 'DKI',
    city: 'JAKARTA2',
    district: 'JAKARTA3',
    village: 'JAKARTA4',
    rtrw: '99',
    occupation: 'PELAJAR',
    nationality: 'INDONESIA',
    marital: 'BELUM KAWIN',
    address: 'JAKARTA5',
    base64Ktp: 'base64'
  };

  const jsonData = JSON.stringify(inputData);


  const writeJsonToFile = async () => {
    try {
      // Specify the directory path
      const customDirectoryPath = `${RNFS.DownloadDirectoryPath}/`;

      // Specify the file path
      const customFilePath = `${customDirectoryPath}skorku.json`;

      // Check if the directory exists, and create it if it doesn't
      if (!(await RNFS.exists(customDirectoryPath))) {
        await RNFS.mkdir(customDirectoryPath);
      }

      // Write the JSON data to the file
      await RNFS.writeFile(customFilePath, JSON.stringify(jsonData), 'utf8');

      console.log('JSON file created successfully at:', customFilePath);
    } catch (error) {
      console.error('Error creating or writing JSON file:', error);
    }
  };



  const handlePress = async () => {
    writeJsonToFile();
    RNLauncherKitHelper.launchApplication('com.cbi.ekyc');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
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
    </SafeAreaView>
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
