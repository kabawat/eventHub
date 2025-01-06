import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const EventScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/event.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.heading}>Explore Upcoming and Nearby Events</Text>
        <Text style={styles.subText}>
          Modern Events Calendar is a powerful and user-friendly tool that simplifies event scheduling, management, and booking.
        </Text>

        <View style={styles.buttonContainer}>

          <TouchableOpacity style={[styles.button, styles.btn]} onPress={() => navigation.replace("Login")}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.outLine]} onPress={() => navigation.replace("Register")}>
            <Text style={styles.outlineText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    alignItems: 'center',
    marginTop: 50,
    flex: 2,
    justifyContent: 'center'
  },
  image: {
    width: '90%',
    marginTop: 30
  },
  logo: {
    width: 150
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: -20,
    color: '#333',
  },
  bottomSection: {
    backgroundColor: '#F4CE14',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    flex: 1,
    marginTop: 20,
    justifyContent: 'center'
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 30,
    // flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
  button: {
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },

  btn: {
    backgroundColor: '#333',
    borderWidth: 1,
  },
  outLine: {
    borderColor: '#333',
    borderWidth: 1,
  },
  outlineText: {
    color: '#333',
    fontWeight: 'bold'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default EventScreen;
