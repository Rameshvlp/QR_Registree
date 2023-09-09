
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { firebase } from './config';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [text, setText] = useState('Not yet scanned');
  const [name, setName] = useState('');

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
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
    
    setText(data);
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
  }

  return (
    <View style={styles.container}>
      {!isScanning ? (
        <View>
          <Text style={styles.maintext}>Click the button to start scanning</Text>
          <Button title={'Start Scanning'} onPress={() => startScanning()} />
        </View>
      ) : (
        <View>
          <View style={styles.barcodebox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 400 }} />
          </View>
          <Text style={styles.maintext}>{text}</Text>
          {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
          <Button title={'Back to Get Started'} onPress={() => setIsScanning(false)} />
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
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});
