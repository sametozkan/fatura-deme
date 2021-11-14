
import axios from 'axios';
import 'react-credit-cards/es/styles-compiled.css';


import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, Image, TouchableOpacity, View, Text } from 'react-native';
import { Defaultcontext } from './src/Context';
import { SelectAssocation, SelectGroup, GetDefinationAndInvoice, InvoicePayment, ResultPayment } from './src/Screens';



export default function App() {

  axios.defaults.baseURL = "https://api-gateway.intertech.com.tr/BankingApiV01/";
  axios.defaults.headers["Ocp-Apim-Subscription-Key"] = "21eaee52eb7f41378c404aa04a322d32";
  const flatlistRef = useRef(null);

  const [selectedGroupList, setSelectedGroupList] = useState(0);
  const [selectedAssociation, setSelectedAssociation] = useState("");
  const [screenId, setScreenId] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [resultStatus, setResultStatus] = useState(0);

  const [screens, setScreens] = useState([
    {
      id: 0,
      Component: <SelectGroup flatlist={flatlistRef} />,
      pageName: ""
    },
    {
      id: 1,
      Component: <SelectAssocation flatlist={flatlistRef} />,
      pageName: "",
    },
    {
      id: 2,
      Component: <GetDefinationAndInvoice flatlist={flatlistRef} />,
      pageName: "",
    },
    {
      id: 3,
      Component: <InvoicePayment flatlist={flatlistRef} />,
      pageName: "",
    },
    {
      id: 4,
      Component: <ResultPayment flatlist={flatlistRef} />,
      pageName: "",
    }
  ])


  const renderScreens = ({ item }) => {
    return item.Component
  }

  const goBack = () => {
    setScreenId(screenId - 1);
    flatlistRef.current.scrollToIndex({ animated: true, index: screenId - 1 })

  }

  return (
    <Defaultcontext.Provider value={{ selectedGroupList, setSelectedGroupList, screenId, setScreenId, selectedAssociation, setSelectedAssociation, screens, setScreens, selectedInvoice, setSelectedInvoice, resultStatus, setResultStatus }}>
      <View style={styles.main}>

        <View style={styles.container}>

          {
            screenId > 0 &&
            <View style={styles.header}>
              <TouchableOpacity activeOpacity={0.8} style={styles.backButton} onPress={() => goBack()}>
                <Image source={{ uri: require('./src/Icons/back.png') }} style={styles.backImage} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {
                  screens[screenId].pageName
                }
              </Text>
            </View>
          }

          <FlatList
            data={screens}
            renderItem={renderScreens}
            ref={flatlistRef}
            showsHorizontalScrollIndicator={false}
            horizontal
            scrollEnabled={false}
          />
        </View>
      </View>
    </Defaultcontext.Provider>

  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5'
  },
  container: {
    width: 540,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

  },
  header: {
    height: 70,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  },
  backButton: {
    height: 47,
    width: 47,
    backgroundColor: '#e4e6eb',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  backImage: {
    height: 26,
    width: 26,
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 25,
    color: '#2f2f2f'
  }
});
