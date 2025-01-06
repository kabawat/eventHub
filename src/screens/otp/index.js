import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import OTPInputView from 'react-native-otp-inputs';

const OTPVerification = () => {
    const handleOTPChange = (code) => {
        console.log('OTP Code:', code);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter OTP</Text>
            <OTPInputView
                style={styles.otpView}
                pinCount={5}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeChanged={handleOTPChange}
                autoFocusOnLoad
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',

    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    otpView: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    underlineStyleBase: {
        width: 40,
        height: 45,
        borderWidth: 1,
        borderColor: '#000',
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
    },
    underlineStyleHighLighted: {
        borderColor: '#03DAC6',
    },
});

export default OTPVerification;
