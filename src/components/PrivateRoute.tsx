import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks';
import { get_profile } from '../store/slice/profile';
import SplashScreen from '../screens/intro';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UnauthenticatedRoute = (Component: any) => {
    return (props: any) => {
        const profile = useSelector((state: any) => state.profile);
        const navigation: any = useNavigation();
        const dispatch = useAppDispatch();

        useEffect(() => {
            const checkToken = async () => {
                const token = await AsyncStorage.getItem('x_a_t');
                if (token) {
                    navigation.replace('Events');
                } else if (!profile?.status && !profile?.error && !profile?.loading) {
                    dispatch(get_profile());
                }
            };

            checkToken();
        }, [profile, navigation, dispatch]);

        if (!profile?.error) {
            return <Component {...props} />;
        }

        return <SplashScreen />;
    };
};

const PrivateRoute = (Component: any) => {
    return (props: any) => {
        const profile = useSelector((state: any) => state.profile);
        const navigation: any = useNavigation();
        const dispatch = useAppDispatch();

        useEffect(() => {
            const checkToken = async () => {
                const token = await AsyncStorage.getItem('x_a_t');
                if (!token) {
                    navigation.replace('Login');
                } else if (!profile?.status && !profile?.error && !profile?.loading) {
                    dispatch(get_profile());
                }
            };

            checkToken();
        }, [profile?.status, navigation, dispatch]);

        if (profile?.status) {
            return <Component {...props} />;
        }

        return <SplashScreen />;
    };
};

export { UnauthenticatedRoute, PrivateRoute };
