
import moment from 'moment';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AttendEventService, FetchEventService } from '../../lib/services/user';
const { width } = Dimensions.get('window')
const DynamicScreen = ({ route, navigation }: any) => {
    const { data } = route.params;
    const [events, setEvents] = React.useState<any>({});

    const handleAttendEvent = async () => {
        try {
            const res = await AttendEventService({ id: data?._id })
            console.log(res)
            setEvents((pre: any) => ({
                ...pre,
                attended: true,
                data: {
                    ...data,
                    totalAttendance: pre?.data?.totalAttendance + 1
                }
            }))
        } catch (error: any) {
            console.log(error?.response.data)
        }
    }
    const lookupAttendence = async (id: string) => {
        try {
            const res = await FetchEventService({ id })
            setEvents(res)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        lookupAttendence(data?._id)
    }, [data?._id])
    return (
        <View style={styles.main}>
            <View style={styles.thumbnail}>
                <Image style={styles.thumbImage} source={require('../../assets/image78.png')} />
                <View style={styles.header}>
                    <View style={styles.nav}>
                        <TouchableOpacity style={styles.backBtn} onPress={navigation.goBack}>
                            <AntDesign style={styles.iconText} name="arrowleft" size={18} color="#807A7A" />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Event Details</Text>
                    </View>
                </View>
                <View style={styles.banner}>
                    <Text style={styles.bannerText}> total Joined : {events?.data?.totalAttendance}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={{ padding: 20 }}>
                    <ScrollView>
                        <Text style={styles.title}>
                            {events?.data?.title}
                        </Text>
                        <View style={styles.Eventcontainer}>
                            <View style={styles.iconWrapper}>
                                <AntDesign style={styles.icon} name="calendar" size={26} color="#F6A641" />
                            </View>
                            <View style={styles.textWrapper}>
                                <Text style={styles.dateText}>{moment(events?.data?.date).format('D MMMM, YYYY')}</Text>
                                <Text style={styles.dayText}>{`${moment(events?.data?.date).format('dddd')}, ${moment(events?.data?.date).format('h:mm A')}`}</Text>
                            </View>
                        </View>
                        <View style={styles.Eventcontainer}>
                            <View style={styles.iconWrapper}>
                                <Ionicons name="location-outline" size={26} color="#F6A641" />
                            </View>
                            <View style={styles.textWrapper}>
                                <Text style={styles.dateText}>{events?.data?.location}</Text>
                                <Text style={styles.dayText}>{`${moment(events?.data?.date).format('dddd')}, ${moment(events?.date).format('h:mm A')}`}</Text>
                            </View>
                        </View>
                        <View style={styles.aboutContainer}>
                            <Text style={styles.title}>
                                About Event
                            </Text>
                            <Text style={styles.description}>
                                {events?.data?.description}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.attendanceContainner}>
                    {
                        events?.attended ? <>
                            <Text style={styles.attendedText}>
                                Already Joined the Event
                            </Text>
                        </> : <>
                            <TouchableOpacity style={styles.attendBtn} onPress={handleAttendEvent}>
                                <Text style={styles.attendText}>
                                    Attend Event
                                </Text>
                            </TouchableOpacity>
                        </>
                    }

                </View>
            </View>
        </View>
    );
};

export default DynamicScreen;
const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    thumbnail: {
        width: width,
        height: 260,
        position: 'relative',
        paddingBlock: 12
    },
    thumbImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    header: {
        paddingVertical: 30,
        width: width * 0.9,
        margin: 'auto',
        marginTop: 20,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    nav: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backBtn: {
        padding: 10,
    },
    iconText: {
        color: "#fff",
        fontSize: 24
    },
    heading: {
        color: "#fff",
        fontSize: 20,
    },
    banner: {
        width: '100%',
        position: 'absolute',
        height: 50,
        bottom: 0,
        paddingHorizontal: 30
    },
    bannerText: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: "#fff",
        height: '100%',
        width: '100%',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        textAlign: 'center',
        lineHeight: 50
    },
    container: {
        flex: 1,
        paddingBottom: 50
    },
    title: {
        paddingTop: 30,
        fontSize: 24,
        color: '#333'
    },
    Eventcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#FFE4B2',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    icon: {
        color: '#F6A641'
    },
    textWrapper: {
        flex: 1,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2C2C2C',
    },
    dayText: {
        fontSize: 14,
        color: '#6B6B6B',
    },
    aboutContainer: {
        paddingHorizontal: 16,
    },
    description: {
        color: '#333',
        paddingTop: 10,
        fontSize: 14,
        paddingLeft: 4
    },
    attendanceContainner: {
        position: 'absolute',
        bottom: 0,
        width: width,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    attendBtn: {
        width: 200,
        height: 50,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333'
    },
    attendText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    attendedText: {
        color: '#F6A641',
        fontSize: 20,
        fontWeight: 'bold'
    }
})