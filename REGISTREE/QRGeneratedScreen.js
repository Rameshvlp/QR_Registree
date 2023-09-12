import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Mailer from 'react-native-mail';


const QRGeneratedScreen = ({ route }) => {
  const { name, email, department, college, selectedEvent } = route.params;
  const dataToEncode = `${name}\n${email}\n${department}\n${college}\n${selectedEvent}`;

  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowImage(false);
    }, 4500);
  }, []);

  return (
    <View style={styles.container}>
      {showImage ? (
        <>
          <Image source={require('./assets/ticks.gif')} style={styles.image} />
          <Text style={styles.title}>Successfully Registered</Text>

        </>
      ) : (
        <>
          <View style={styles.qrContainer}>
          <Text style={styles.titles}>Successfully Registered</Text>
          <QRCode value={dataToEncode} size={200} />
          </View>
        </>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: -100,
    marginBottom: 20,
  },
  images:{
    width: 100,
    height: 100,
    marginLeft:50,
    marginTop:20,
  },
  qrContainer: {
    flex:1,
    justifyContent:"space-around",
    alignItems:"center",
    maxHeight:500,
    marginBottom:100
  },
  titles:{
    fontSize:20,
    fontWeight:'bold',
  }
});

export default QRGeneratedScreen;
