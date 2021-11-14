import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import moment from 'moment'

const InvoiceBox = ({ amount, lastPaymentDate, isActive, onPress }) => {


    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.main, isActive ? styles.activeBorder : null]}
            activeOpacity={0.8}
        >
            <Text style={styles.amount}>
                {amount} TL
            </Text>
            <Text style={styles.lastPaymentDate}>
                SÖ : {moment(lastPaymentDate).format('l')}
            </Text>
        </TouchableOpacity>
    )
}

export default InvoiceBox

const styles = StyleSheet.create({
    main: {
        height: 130,
        width: 130,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
        marginTop: 20,
        borderRadius: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    amount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2f2f2f',
        marginBottom: 5,
    },
    lastPaymentDate: {
        color: 'rgba(0,0,0,0.9)',
        fontSize: 12,
        flexDirection: 'row'
    },
    activeBorder: {
        borderColor: '#6731c0',
    }
})
