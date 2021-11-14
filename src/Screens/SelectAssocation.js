import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { IconButton, TextBox } from '../Components';
import { Defaultcontext } from '../Context';
var data = [];

const SelectAssication = ({ flatlist }) => {

    const { selectedGroupList, screens, setScreens } = useContext(Defaultcontext);
    const [associations, setAssociations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { setSelectedAssociation, setScreenId } = useContext(Defaultcontext);

    const renderAssociatons = ({ item }) => {
        return (
            <IconButton
                label={item.AssociationName}
                onPress={() => selectAssociation(item.AssociationCode, item.AssociationName)}
            />
        )
    }

    const selectAssociation = (associationCode, associationName) => {
        flatlist.current.scrollToIndex({ animated: true, index: 2 })
        setSelectedAssociation(associationCode);
        setScreenId(2)
        screens[2].pageName = associationName;
        setScreens(screens);
    }

    const searchAssociation = (e) => {
        setAssociations(data)
        let newData = associations.filter((item) => {
            return item.AssociationName.toLowerCase().match(e);
        });
        setAssociations(newData);
        if (e === "") {
            setAssociations(data);
        }
    }

    const renderEmpty = () => {
        return (
            <View>
                <Text>Kurum bulunamadı.</Text>
            </View>
        )
    }

    const getAssociations = () => {
        setIsLoading(true)
        axios.post("GetAssociationList", {
            header: {
                AppKey: "a04cfa7a159b48e9f7d73fb92ef9b3b9",
                Channel: "API",
                ChannelSessionId: "Fatura ödene deneme 1",
                ChannelRequestId: "Fatura ödene deneme 2",
            },
            Parameters: [
                {
                    CollectionGroup: selectedGroupList.toString()
                }
            ]
        })
            .then(result => {
                setAssociations(result.data.Data.Response);
                data = result.data.Data.Response;
                console.log(result.data.Data.Response)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (selectedGroupList > 0) {
            getAssociations();

        }
    }, [selectedGroupList])

    return (
        <View style={styles.main}>
            <TextBox
                placeholder={"Kurum ara"}
                onChangeText={searchAssociation}
            />
            {
                isLoading ? <ActivityIndicator size="small" color="#2f2f2f" /> :
                    <FlatList
                        data={associations}
                        renderItem={renderAssociatons}
                        style={styles.main}
                        ListEmptyComponent={renderEmpty}

                    />
            }
        </View>
    )
}

export default SelectAssication

const styles = StyleSheet.create({
    main: {
        width: 500,
        height: 530,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    textInput: {
        height: 50,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
        marginBottom: 10,
        borderRadius: 10,
        outlineWidth: 0
    },
    textInputFocus: {
        borderColor: '#6731c0',
    }
})
