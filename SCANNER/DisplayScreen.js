// DisplayScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DisplayScreen = ({ route }) => {
  const { scannedData } = route.params;

  return (
    <View style={styles.container}>
        
      <Text style={styles.text}>Registered Participant Details:</Text>
      <View>
        <Text style={styles.scannedText}>{scannedData}</Text>

        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    marginBottom:150,fontWeight:'bold',
  },
  scannedText: {
    fontSize: 16,
    marginBottom:100,

  },
});

export default DisplayScreen;
