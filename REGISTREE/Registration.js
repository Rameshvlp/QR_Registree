// AnotherScreen.js// AnotherScreen.js
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native'; 
import QRGeneratedScreen from './QRGeneratedScreen';
import { firebase } from './config';

        const Registration = () => {
        const navigation =useNavigation();
        const [name, setName] = useState(''); 
        const [email, setEmail] = useState('');
        const [department, setDepartment] = useState('');
        const [college, setCollege] = useState('');
        const [selectedEvent, setSelectedEvent] = useState('Select Event');
        const [isEmailValid, setIsEmailValid] = useState(true);
        const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false); 
        //const [checkname, setCheckName] = useState('Name1'); // Set the initial name
        const [currentCount, setCurrentCount] = useState(null);


  
        useEffect(() => {
          // Initialize Firebase and retrieve the current count
          const db = firebase.firestore();
          const documentRef = db.collection('Eventcount').doc(selectedEvent);
      
          documentRef.get()
            .then(doc => {
              if (doc.exists) {
                setCurrentCount(doc.data().count);
              } else {
                
                console.log('Document does not exist. Creating a new one.');
                
                documentRef.set({ count: 1 })
                  .then(() => {
                    setCurrentCount(1);
                    console.log('New document created.');
                    
                  })
                  .catch(error => {
                    console.error('Error creating new document:', error);
                  });
              }
            })
            .catch(error => {
              console.error('Error getting document:', error);
            });
        }, [selectedEvent]);


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkAllFieldsFilled = () => {
    return name && email && department && college && selectedEvent !== 'Select Event';
  }
  

  const handleGenerateQR = async () => {
    if (!name || !email || !department || !college || selectedEvent === 'Select Event') {
      console.log('Please fill in all the details');
      Toast.show({
        type: 'error',
        text1: 'Please fill all the details to get',
        position: 'top',
      });
      return;
    }

    if (!checkAllFieldsFilled()) {
      console.log('Please fill in all the details');
      Toast.show({
        type: 'error',
        text1: 'Please fill all the details to get',
        position: 'top',
      });
      return;
    }
    setIsAllFieldsFilled(true);

    if (!isValidEmail(email)) {
      console.log('Invalid email format');
      setIsEmailValid(false);
      Toast.show({
        type: 'error',
        text1: 'Invalid Email ',
        position: 'top',
      });
      return;
    }


    if (currentCount < 5) {
      // Increment the count for the selected name
      
      const documentRef = firebase.firestore().collection('Eventcount').doc(selectedEvent);

      const newCount = currentCount + 1;

      documentRef.update({ count: newCount })
        .then(() => {
          setCurrentCount(newCount);
          console.log(`Count incremented to ${newCount}`);
        })
        .catch(error => {
          console.error('Error updating count:', error);
        });
    } else {
      console.log('Count is full');
      
      Toast.show({
        type: 'error',
        text1: 'Maximun Participants reached... ',
        position: 'top',
      });
      return;
    }

    console.log('Generating QR with data:', {
      name,
      email,
      department,
      college,
      selectedEvent,
    });
    navigation.navigate('QR Screen',{
      name,
      email,
      department,
      college,
      selectedEvent,
    }); 
  };

  return (
    
    <View style={styles.container}>
      <Image
      source={require('./assets/account.png')}
      style={styles.image}
      
      />
      <Text style={styles.title}>Registration Form</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email ID"
        style={[
          styles.input,
          !isEmailValid && styles.inputError,
        ]}
        value={email}
        onChangeText={(text) => {

          setEmail(text);
          setIsEmailValid(true); 
        }
      }
      />
      <TextInput
        placeholder="Department"
        style={styles.input}
        value={department}
        onChangeText={setDepartment}
      />
      <TextInput
        placeholder="College"
        style={styles.input}
        value={college}
        onChangeText={setCollege}
      />
            <Text style={styles.title}>Select any Event Below</Text>
             <Picker
        selectedValue={selectedEvent}
        onValueChange={(itemValue, itemIndex) => setSelectedEvent(itemValue)}
        style={styles.picker}
      >
      
        <Picker.Item label="Select Any" value=""/>
        <Picker.Item label="1.Cyberfest" value="cyberfest" />
        <Picker.Item label="2.Code Ninja" value="code_ninja" />
        <Picker.Item label="3.Code Sprint" value="Code Sprint" />
        <Picker.Item label="4.NetHunt" value="NetHunt" />
        <Picker.Item label="5.Techgig" value="Techgig" />
        <Picker.Item label="6.Invenier" value="Invenier" />
        <Picker.Item label="7.Flip-Flop" value="Flip-Flop" />
        <Picker.Item label="8.CyberNerd" value="CyberNerd" />
        <Picker.Item label="9.Artistry" value="Artistry" />
        <Picker.Item label="10.Techiadz" value="Techiadz" />

      </Picker>
      <TouchableOpacity onPress={handleGenerateQR} style={styles.button}>
        {/* {isAllFieldsFilled ? (
          <Ionicons name="checkmark" size={24} color="white" />
        ) : (tick)} */}
                  <Text style={styles.buttonText}>Generate QR</Text>

      </TouchableOpacity>
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor : '#ff3333',
  },
  picker: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 70,
  height: 70,
  marginBottom: 20,
  }
});

export default Registration;