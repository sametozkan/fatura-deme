import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import { Defaultcontext } from '../Context';
import { Button } from '../Components';


const ResultPayment = () => {
    const anim = useRef(null);
    const { resultStatus, setResultStatus } = useContext(Defaultcontext);

    useEffect(() => {
        if (resultStatus === 2) anim.current?.play()
    }, [resultStatus])

    return (
        <View style={styles.main}>
            <LottieView ref={anim} source={require('./../Icons/success.json')} />
            <View style={{ height: 100, top: -20 }}>
                <Button label="Farklı fatura öde" />
            </View>
        </View>
    )
}

export default ResultPayment

const styles = StyleSheet.create({
    main: {
        width: 500,
        height: 500,
        borderRadius: 10,
        backgroundColor: 'white',

    },
})
