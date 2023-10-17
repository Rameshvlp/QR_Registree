import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native'; 

const Registration = () => {
  const navigation = useNavigation();
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [college, setCollege] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(''); // Initialize with an empty string
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [eventTouches, setEventTouches] = useState({}); // Store touches for each event
  const eventNames = [
    'Cyberfest',
    'Code Ninja',
    'Code Sprint',
    'NetHunt',
    'Techgig',
    'Invenier',
    'Flip-Flop',
    'CyberNerd',
    'Artistry',
    'Techiadz',
  ];

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkAllFieldsFilled = () => {
    return name && email && department && college && selectedEvent;
  }

  const handleGenerateQR = () => {
    if (!checkAllFieldsFilled()) {
      console.log('Please fill in all the details');
      Toast.show({
        type: 'error',
        text1: 'Please fill all the details to get',
        position: 'top',
      });
      return;
    }

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

    // Check if the selectedEvent has reached the touch limit (25)
    if (eventTouches[selectedEvent] >= 25) {
      console.log('Maximum participant count reached for', selectedEvent);
      Toast.show({
        type: 'error',
        text1: `Maximum participants reached for ${selectedEvent}`,
        position: 'top',
      });
      return;
    }

    // Update the event touches count
    setEventTouches({
      ...eventTouches,
      [selectedEvent]: (eventTouches[selectedEvent] || 0) + 1,
    });

    console.log('Generating QR with data:', {
      name,
      email,
      department,
      college,
      selectedEvent,
    });

    navigation.navigate('QR Screen', {
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
        onValueChange={(itemValue) => setSelectedEvent(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Any" value="" />
        {eventNames.map((eventName) => (
          <Picker.Item
            key={eventName}
            label={`${eventName} (${eventTouches[eventName] || 0}/25)`}
            value={eventName}
          />
        ))}
      </Picker>
      <TouchableOpacity onPress={handleGenerateQR} style={styles.button}>
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
    backgroundColor: '#0099ff',
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
  },
});

export default Registration;
