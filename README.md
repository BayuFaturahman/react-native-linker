# Pengunaan SDK SkorKu React Native

## Penginstalan

Folder SDK.zip di extract di simpan di root project

Folder liveness.zip di extract di simpan di root android 


## Implementasi ke liveness

1. Modifikasi file **android/settings.gradle** seperti berikut untuk menambahkan referensi ke modul liveness:

```gradle
...
include ':app', ':liveness'

```

2. Jika versi react-native project Anda >= 0.60.0, Anda perlu menambahkan konfigurasi berikut ke file **android/gradle.properties** Anda:

```
android.enableJetifier=true

```


3. Modifikasi file **android/app/build.gradle** untuk menambahkan dependensi perpustakaan, kemudian lakukan gradle sync untuk menyelesaikan konfigurasi dependensi SDK:
```java
...
android {
...
}
dependencies {
...
//Tambahkan dependencies dibawah ini
api project(':liveness')
}
```

4. Tambahkan **LivenessReactPackage**
 - Di android/app direktori, temukan kelas yang mengimplementasikan **ReactApplication** dengan nama default **MainApplication**, tambahkan **LivenessReactPackage**

- untuk versi react-native >= 0.60 :

```java
import ai.advance.liveness.sdk.rn.LivenessReactPackage; // <------- add this

public class MainApplication extends Application implements ReactApplication {

   // ...
    @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          packages.add(new LivenessReactPackage()); // <------- add this
          return packages;
        }
```

- untuk versi lama react-native >=0.29 :

```java
import ai.advance.liveness.sdk.rn.LivenessReactPackage; // <------- add this

public class MainApplication extends Application implements ReactApplication {

   // ...
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(), // <---- add comma
        new LivenessReactPackage() // <---------- add this
      );
    }
```

## Tambahkan Dependensi
Tambahkan dependencies dibawah ini pada package.json utama aplikasi react-native anda

    "@react-native-community/checkbox": "^0.5.16",
    "@react-native-community/datetimepicker": "^7.6.0",
    "@react-navigation/native": "^6.1.7",
    "@react-navigation/native-stack": "^6.9.13",
    "axios": "^1.5.0",
    "react-native-autoheight-webview": "^1.6.5",
    "react-native-confirmation-code-field": "^7.3.1",
    "react-native-device-info": "^10.11.0",
    "react-native-encrypted-storage": "^4.0.3",
    "react-native-fs": "^2.20.0",
    "react-native-image-crop-picker": "^0.40.0",
    "react-native-linear-gradient": "^2.8.3",
    "react-native-modal-datetime-picker": "^17.1.0",
    "react-native-radio-buttons-group": "^3.0.3",
    "react-native-safe-area-context": "^4.7.2",
    "react-native-screens": "^3.25.0",
    "react-native-vision-camera": "^3.1.0",
    "react-native-webview": "^13.6.0",
    "utf8": "^3.0.0"

Lalu setelah itu pada root project react-native anda, lakukan perintah:

```bash
npm install
# atau
yarn
```

## Contoh Penggunaan:

```js
import React, { useState } from 'react';
import { Button, View } from 'react-native';
import SkorkuLivenessSDK from './react-native-skorku-sdk';

function Example(): JSX.Element {

  const [test, setTest] = useState(false)

  return (
    <>
      {
        test ?
          <SkorkuLivenessSDK
            sdkKey='yourSdkKey'
            secretKey='yourSecretKey'
            skorkuKey='key'
            skorkusecret='secret'
            onExited={setTest}
          />
          : <View>
            {/* ... your components */}
            <Button title='launch sdk' onPress={() => setTest(true)} />
          </View>
      }
    </>
  );
}

export default Example;
```