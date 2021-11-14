import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Defaultcontext } from '../Context';
import axios from 'axios';
import { Button, TextBox, InvoiceBox } from '../Components';
import moment from 'moment'

const GetDefination = ({ flatlist }) => {

    const { selectedAssociation, screens, setScreenId, selectedInvoice, setSelectedInvoice, setScreens } = useContext(Defaultcontext);
    const [placeholder, setPlaceholder] = useState("");
    const [queryValue, setQueryValue] = useState("");
    const [bills, setBills] = useState([]);
    const [isResponse, setIsResponse] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        if (selectedAssociation !== "") {
            getQueryDefination();
            setIsResponse(false);
            setIsError(false);
            setQueryValue("");
            setPlaceholder("");

        }

    }, [selectedAssociation])


    const getQueryDefination = () => {
        axios.post("GetScreenDefinition", {
            header: {
                AppKey: "a04cfa7a159b48e9f7d73fb92ef9b3b9",
                Channel: "API",
                ChannelSessionId: "Fatura ödene deneme 1",
                ChannelRequestId: "Fatura ödene deneme 2",
            },
            Parameters: [
                {
                    AssociationCode: selectedAssociation
                }
            ]
        })
            .then(result => {
                console.log(result.data.Data.Response.QueryInputFields[0].CodeString);
                if (result.data.Data.Response.QueryInputFields[0].CodeString) {
                    setPlaceholder(result.data.Data.Response.QueryInputFields[0].CodeString)
                }
                else {
                    alert("Hata")
                }
            })
    }

    const queryInvoices = () => {
        setIsLoading(true);
        axios.post("QueryInvoices", {
            header: {
                AppKey: "a04cfa7a159b48e9f7d73fb92ef9b3b9",
                Channel: "API",
                ChannelSessionId: "Fatura ödene deneme 1",
                ChannelRequestId: "Fatura ödene deneme 2",
            },
            Parameters: [
                {
                    AssociationCode: selectedAssociation,
                    SubDealerCode: "",
                    Request: {
                        AssociationCode: selectedAssociation,
                        SubscriberNumber: queryValue
                    },
                    CustomerNo: "3488017"
                }
            ]
        })
            .then(result => {

                if (result.data.Error) {
                    setIsError(true)
                    setIsResponse(false);
                    setBills([]);
                }
                else {
                    setBills(result.data.Data.Response.BillInformation);

                    setIsResponse(true);
                }


            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const selectInvoice = (invoiceNumber) => {
        let index = bills.findIndex(item => item.InvoiceNumber === invoiceNumber)
        if (index > -1) {
            setSelectedInvoice(bills[index]);
        }
    }

    const renderBills = ({ item }) => {
        return (
            <InvoiceBox
                amount={item.InvoiceAmount}
                lastPaymentDate={item.LastPaymentDate}
                isActive={item.InvoiceNumber === selectedInvoice.InvoiceNumber}
                onPress={() => selectInvoice(item.InvoiceNumber)}
            />
        )
    }

    const goToPay = () => {
        flatlist.current.scrollToIndex({ animated: true, index: 3 })
        setScreenId(3)
        screens[3].pageName = selectedInvoice.InvoiceAmount + " TL - Son Ödeme " + moment(selectedInvoice.LastPaymentDate).format('l');
        setScreens(screens);
    }

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <TextBox
                    placeholder={placeholder}
                    onChangeText={setQueryValue}
                />
                <Button
                    label="Sorgula"
                    onPress={() => queryInvoices()}
                    isLoading={isLoading}
                />
                {
                    isError && <Text style={styles.errorText}>Ödenmemiş fatura bulunmamaktadır.</Text>
                }
            </View>

            {
                isResponse &&
                <View style={{ flex: 1, }}>
                    <Text style={styles.headerTitle}>
                        Bekleyen faturalarınız ({bills.length})
                    </Text>
                    <View style={styles.invoices}>
                        <FlatList
                            data={bills}
                            renderItem={renderBills}
                            horizontal
                            contentContainerStyle={{ flexDirection: 'row' }}
                            style={{ flexDirection: 'row' }}

                        />

                    </View>
                    <Button
                        label="Fatura Öde"
                        onPress={() => goToPay()}
                        disabled={!selectedInvoice.InvoiceNumber}

                    />
                </View>
            }
        </View>
    )
}

export default GetDefination

const styles = StyleSheet.create({
    main: {
        width: 500,
        height: 530,
        borderRadius: 10,
        backgroundColor: 'white',

    },
    container: {
        height: 150,
        marginTop: 40,

    },
    invoices: {
        flex: 1,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'rgba(0,0,0,0.5)'
    },
    errorText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'red'
    }
})
