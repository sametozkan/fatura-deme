import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'

const IconButton = ({ path, label, rightPath, onPress }) => {

    const [scale, setScale] = useState(1);

    return (
        <Pressable
            onPress={onPress}
            activeOpacity={1}
            onPressIn={() => setScale(0.995)}
            onPressOut={() => setScale(1)}
            style={({ hovered }) => [
                styles.main,
                {
                    backgroundColor: hovered
                        ? '#d8dadf'
                        : '#e4e6eb',
                    transform: [
                        {
                            scale
                        }
                    ]
                },

            ]}
        >
            <View style={styles.container}>
                {path && <Image style={styles.icon} source={{ uri: path }} />}
                <Text style={styles.text}>
                    {label}
                </Text>
                <Image style={[styles.icon, styles.rightIcon]} source={{ uri: require('../Icons/right.png') }} />
            </View>
        </Pressable >
    )
}

export default IconButton

const styles = StyleSheet.create({
    main: {
        height: 80,
        width: 500,
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 10,
    },
    icon: {
        height: 45,
        width: 45,
        marginRight: 20,
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
        color: '#2f2f2f'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rightIcon: {
        position: 'absolute',
        right: -20,
        height: 30,
        width: 30,
    }
})
