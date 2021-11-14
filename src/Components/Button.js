import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native'

const Button = ({ label, onPress, isLoading, disabled }) => {

    const [scale, setScale] = useState(1);

    return (
        <Pressable
            onPress={!disabled ? onPress : null}
            activeOpacity={1}
            onPressIn={() => setScale(0.995)}
            onPressOut={() => setScale(1)}
            style={({ hovered }) => [
                styles.main,
                {
                    backgroundColor: hovered
                        ? 'rgba(103, 49, 192,0.9)'
                        : '#6731c0',
                    transform: [
                        {
                            scale
                        }
                    ]
                },
                disabled ? { backgroundColor: 'rgba(0,0,0,0.2)' } : null

            ]}
        >
            {
                isLoading ? <ActivityIndicator size="small" color="white" /> : <Text style={[styles.text, disabled ? { color: '#2f2f2f' } : null]}>
                    {label}
                </Text>
            }
        </Pressable >
    )
}

export default Button

const styles = StyleSheet.create({
    main: {
        height: 47,
        flex: 1,
        maxHeight: 47,
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center',
        userSelect: "none"
    },
    icon: {
        height: 45,
        width: 45,
        marginRight: 20,
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
        color: 'white'
    },
    rightIcon: {
        position: 'absolute',
        right: -20,
        height: 30,
        width: 30,
    }
})
