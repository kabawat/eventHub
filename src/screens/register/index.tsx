import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import React, { useState } from 'react';
import { RegisterService } from '../../lib/services/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateToken } from '../../store/slice/common';
import { useAppDispatch } from '../../hooks';

const { width } = Dimensions.get('window');

const Register = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const [isLoader, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const { fullname, email, password, cpassword } = formData;

      if (!fullname || !email || !password || !cpassword) {
        Alert.alert('Error', 'All fields are required');
        return;
      }

      if (password !== cpassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }

      const res = await RegisterService({ fullname, email, password })
      await AsyncStorage.setItem('x_a_t', res.token);
      await AsyncStorage.setItem('x_a_t', res.token);
      dispatch(updateToken(res?.token))
      navigation.replace('Events');
    } catch (error: any) {
      console.log(error)
      Alert.alert('Error', error?.response?.data?.message || 'something went wrong.');
    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.backImage}>
        <Image source={require('../../assets/bg.png')} resizeMode="contain" />
      </View>
      <View style={styles.formSection}>
        <View>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={styles.heading}>Sign Up</Text>
        <View style={styles.form}>
          <View style={styles.inputView}>
            <View style={styles.icon}>
              <Icon style={styles.iconText} name="user" size={18} color="#807A7A" />
            </View>
            <TextInput
              style={styles.inputBox}
              placeholder="Full Name"
              value={formData.fullname}
              onChangeText={(text) => handleInputChange('fullname', text)}
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.icon}>
              <Icon style={styles.iconText} name="mail" size={18} color="#807A7A" />
            </View>
            <TextInput
              style={styles.inputBox}
              placeholder="Email ID"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.icon}>
              <Icon style={styles.iconText} name="lock" size={18} color="#807A7A" />
            </View>
            <TextInput
              style={styles.inputBox}
              placeholder="Your password"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
            />
          </View>

          <View style={styles.inputView}>
            <View style={styles.icon}>
              <Icon style={styles.iconText} name="lock" size={18} color="#807A7A" />
            </View>
            <TextInput
              style={styles.inputBox}
              placeholder="Confirm password"
              secureTextEntry
              value={formData.cpassword}
              onChangeText={(text) => handleInputChange('cpassword', text)}
            />
          </View>

          <View>
            {
              isLoader ? <>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.btnText}>
                    Submit
                  </Text>
                  <Text>
                    <ActivityIndicator style={{ width: 10, marginLeft: 10 }} size="small" color="#fff" />
                  </Text>
                </TouchableOpacity>
              </> : <>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
              </>
            }

            <View style={styles.pageLink}>
              <Text style={styles.pageLinkTaxt}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    position: 'relative',
  },
  backImage: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  logo: {
    width: 120,
    alignItems: 'center',
    margin: 'auto',
    marginBottom: 30,
  },
  formSection: {
    width: width * 0.8,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  form: {
    paddingTop: 10,
  },
  inputView: {
    width: '100%',
    borderColor: '#E4DFDF',
    borderWidth: 1,
    borderRadius: 10,
    position: 'relative',
    paddingLeft: 50,
    marginVertical: 10,
  },
  icon: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 50,
    height: '100%',
    justifyContent: 'center',
  },
  iconText: {
    textAlign: 'center',
  },
  pageLink: {
    width: '100%',
    marginTop: 6,
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
  pageLinkTaxt: {
    color: '#333',
  },
  link: {
    color: '#5669FF',
    paddingLeft: 6,
  },
  inputBox: {
    width: '100%',
    paddingVertical: 15,
  },
  button: {
    marginTop: 20,
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#333',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    width: 80,
    textAlign: 'center',
  },
});
