import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';

const SplashScreen = ({ navigation }: any) => {
    return (
        <View style={styles.main}>
            <Image style={styles.thumbImage} source={require('../../assets/logo.png')} />
            <Text style={styles.text}>Welcome to EventHub</Text>
            <Text>
                <ActivityIndicator style={styles.loader} size="large" color="#333" />
            </Text>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbImage: {
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#888',
        marginBottom: 40
    },
    loader: {
        marginTop: 20,
    }
});
