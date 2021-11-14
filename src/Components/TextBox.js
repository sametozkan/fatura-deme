import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const TextBox = ({ placeholder, onChangeText, type }) => {

    const [onFocus, setOnFocus] = useState(false);

    return (
        <TextInput
            placeholder={placeholder}
            style={[styles.textInput, onFocus ? styles.textInputFocus : null]}
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
            onChangeText={e => onChangeText(e)}

        />
    )
}

export default TextBox

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
        marginBottom: 10,
        borderRadius: 10,
        outlineWidth: 0,
        width: '100%'
    },
    textInputFocus: {
        borderColor: '#6731c0',
    }
})
