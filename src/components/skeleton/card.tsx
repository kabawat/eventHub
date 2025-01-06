import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { width } = Dimensions.get('window');
function CardSkeleton() {
    return (
        <View style={styles.container}>
            <SkeletonPlaceholder borderRadius={8}>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent='center'>
                    <SkeletonPlaceholder.Item width={'100%'} height={80} />
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        </View>
    );
}

export default CardSkeleton;
const styles = StyleSheet.create({
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
    cardInner: {
        width: '100%',
        // padding: 5
    },
    container: {
        paddingVertical: 5
    }
})
