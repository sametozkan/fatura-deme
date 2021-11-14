import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from '../Components'
import axios from 'axios';
import { Defaultcontext } from '../Context';



const SelectGroup = ({ flatlist }) => {

    const { setSelectedGroupList, setScreenId, setHeaderTitle, screens, setScreens } = useContext(Defaultcontext);
    const getAssicationList = (groupId, title) => {
        flatlist.current.scrollToIndex({ animated: true, index: 1 })
        setSelectedGroupList(groupId);
        setScreenId(1);
        screens[1].pageName = title;
        setScreens(screens);
    }

    return (
        <View style={styles.main}>
            <IconButton
                onPress={() => getAssicationList(3, "Elektrik")}
                label="Elektrik"
                path={require('../Icons/electricity.png')}
            />
            <IconButton
                onPress={() => getAssicationList(4, "Doğalgaz")}
                label="Doğalgaz"
                path={require('../Icons/gas.png')}
            />
            <IconButton
                onPress={() => getAssicationList(28, "TV Yayın")}
                label="TV Yayın"
                path={require('../Icons/tv.png')}
            />
            <IconButton
                onPress={() => getAssicationList(2, "Su")}
                label="Su"
                path={require('../Icons/water.png')}
            />
            <IconButton
                onPress={() => getAssicationList(1, "İnternet")}
                label="İnternet"
                path={require('../Icons/router.png')}
            />
            <IconButton
                onPress={() => getAssicationList(25, "Cep Telefonu")}
                label="Cep Telefonu"
                path={require('../Icons/iphone.png')}
            />
        </View>
    )
}

export default SelectGroup

const styles = StyleSheet.create({
    main: {
        flex: 1,
        maxHeight: 80,
        height: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'white'
    }
})
