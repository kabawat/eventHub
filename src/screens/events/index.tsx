import moment from "moment";
import { useEffect, useRef } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchAllEvents } from "../../store/slice/event";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import CardSkeleton from "../../components/skeleton/card";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../../store";
const { width } = Dimensions.get('window')
function Events({ navigation }: any) {
    const events = useSelector((state: any) => state.events);
    const dispatch = useAppDispatch()
    const flatListRef = useRef<any>(null)
    const handleEvent = (data: any) => (e: any) => {
        navigation.navigate('DynamicEvent', { data })
    }

    const fetchEvents = (page: number = 1) => {
        dispatch(fetchAllEvents({ page }))
    }

    const handleRefresh = () => {
        fetchEvents()
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
    const handleScrollEnd = () => {
        const { currentPage, totalPages } = events
        if (currentPage < totalPages) {
            const page = currentPage + 1
            fetchEvents(page)
        }
    }
    useEffect(() => {
        fetchEvents()
    }, [])

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("x_a_t");
            store.dispatch({ type: 'RESET_STORE' })
            navigation.replace('Login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }


    const renderItem = ({ item }: any) => (
        <View style={styles.cardSection} key={item._id}>
            <View style={styles.card}>
                <View style={styles.themSec}>
                    <Image
                        source={require('../../assets/event-them.png')}
                        style={styles.themImg}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.eventDetails}>
                    <View style={styles.detaile}>
                        <Text style={styles.date}>
                            {moment(item.date).format('ddd, MMM D - h:mm A')}
                        </Text>
                        <Text style={styles.title}>
                            {item.title}
                        </Text>
                        <Text style={styles.location}>
                            <Ionicons name="location-outline" size={14} color="#807A7A" />
                            {item.location}
                        </Text>
                    </View>
                    <View style={styles.viewBtn}>
                        <TouchableOpacity style={styles.viewMoreBtn} onPress={handleEvent(item)}>
                            <Ionicons style={styles.viewMoreText} name="arrow-redo-outline" size={18} color="#807A7A" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <View style={styles.nav}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.nav}>
                    <TouchableOpacity style={styles.backBtn} onPress={handleRefresh}>
                        <MaterialCommunityIcons style={styles.iconText} name="refresh" size={18} color="#807A7A" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backBtn} onPress={handleLogout}>
                        <MaterialIcons style={styles.iconText} name="logout" size={18} color="#807A7A" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.container} >
                    {
                        !events?.status && !events.error && <>
                            {
                                Array.from({ length: 8 })?.map((i: any, indx: number) => {
                                    return <CardSkeleton key={indx} />
                                })
                            }
                        </>
                    }
                    {
                        events?.status && events?.data?.length && <>
                            <FlatList
                                ref={flatListRef}
                                data={events?.data}
                                renderItem={renderItem}
                                keyExtractor={(item) => item._id}
                                contentContainerStyle={styles.container}
                                showsVerticalScrollIndicator={false}
                                onEndReached={handleScrollEnd}
                                onEndReachedThreshold={0.1}
                            />
                        </>
                    }
                </View >
            </View>
        </View>
    )
}
export default Events


const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    header: {
        // paddingVertical: 30,
        width: width * 0.9,
        margin: 'auto',
        marginTop: 20,
        // backgroundColor: 'red',
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backBtn: {
        padding: 10
    },
    iconText: {
        fontSize: 24
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    logo: {
        width: 100,
    },
    body: {
        flex: 1,
        padding: 10
    },
    container: {
        // flex:1
    },
    cardSection: {
        padding: 5,
    },
    card: {
        height: 90,
        width: '100%',
        overflow: 'hidden',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    themSec: {
        width: 80,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 8,
        overflow: 'hidden',
        padding: 8
    },
    themImg: {
        width: '100%',
    },
    eventDetails: {
        width: '80%',
        paddingLeft: 5,
        flexDirection: "row"
    },
    detaile: {
        width: '70%',
        paddingVertical: 10,

    },

    date: {
        fontSize: 12,
        color: '#F6A641'
    },
    title: {
        fontSize: 18,
        color: "#333",
        paddingVertical: 2,
        paddingRight: 10,
        fontWeight: 'bold'
    },
    location: {
        fontSize: 14,
        justifyContent: 'center'
    },
    viewBtn: {
        width: '30%',
        backgroundColor: '#F4CE14'
    },
    viewMoreBtn: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewMoreText: {
        color: '#333',
        fontSize: 26,
    }
})