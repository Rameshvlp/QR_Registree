import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { firebase } from './config';

const ScannerScreen = () => {
  const navigation = useNavigation(); // Get the navigation object
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    navigation.navigate('DisplayScreen', { scannedData: data });
    const scannedData = data.split('\n');
    const [name, email, department, college, event] = scannedData;

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Department:', department);
    console.log('College:', college);
    console.log('Event:', event);

    try {
      const docRef = await firebase.firestore().collection('new-data').add({
        name,
        email,
        department,
        college,
        event,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log('Document written with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>
    );
  }

  const startScanning = () => {
    setIsScanning(true);
    setScanned(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>QR-REGISTREE</Text>

      {!isScanning ? (
        <View>
          <Image
            source={require('./assetss/face-scan.png')}
            style={styles.image}
          />
          <Text style={styles.maintext}></Text>
          <Button title={'Start Scanning'} onPress={() => startScanning()} />
        </View>
      ) : (
        <View>
          <View style={styles.barcodebox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 400 }}
            />
          </View>
          {scanned && (
            <Button title={'Scan again?'} onPress={() => setScanned(false)} color='maroon' />
          )}
          <Button title={'Back'} onPress={() => setIsScanning(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  text: {
    marginBottom: 100,
    fontSize: 30,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default ScannerScreen;
