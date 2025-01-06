import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import React, { useState } from 'react';
import { LoginService } from '../../lib/services/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../../store';
import { useAppDispatch } from '../../hooks';
import { updateToken } from '../../store/slice/common';

const { width } = Dimensions.get('window');

const Login = ({ navigation }: any) => {
    const dispatch = useAppDispatch()
    const [formData, setFormData] = useState({
        loginIdentifier: '',
        password: '',
    });

    const handleChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        try {
            const { loginIdentifier, password } = formData;

            // Validate inputs
            if (!loginIdentifier || !password) {
                Alert.alert('Error', 'Please fill in all fields.');
                return;
            }
            const res = await LoginService(formData)
            await AsyncStorage.setItem('x_a_t', res.token);
            dispatch(updateToken(res?.token))
            navigation.replace('Events');

        } catch (error: any) {
            console.log("errror-------> ", error)
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.backImage}>
                <Image source={require('../../assets/bg.png')} resizeMode="contain" />
            </View>
            <View style={styles.formSection}>
                <View>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.heading}>Login</Text>
                <View style={styles.form}>
                    <View style={styles.inputView}>
                        <View style={styles.icon}>
                            <Icon style={styles.iconText} name="mail" size={18} color="#807A7A" />
                        </View>
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Username or Email ID"
                            value={formData.loginIdentifier}
                            onChangeText={(text) => handleChange('loginIdentifier', text)}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <View style={styles.icon}>
                            <Icon style={styles.iconText} name="lock" size={18} color="#807A7A" />
                        </View>
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Password"
                            secureTextEntry
                            value={formData.password}
                            onChangeText={(text) => handleChange('password', text)}
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.btnText}>Login</Text>
                        </TouchableOpacity>
                        <View style={styles.pageLink}>
                            <Text style={styles.pageLinkText}>Don’t have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.link}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Login;

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
    pageLinkText: {
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
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});
