import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Cards from 'react-credit-cards';
import { TextBox, Button } from '../Components';
import axios from 'axios';
import { Defaultcontext } from '../Context';

const InvoicePayment = ({ flatlist }) => {


    const { selectedInvoice, selectedAssociation, setScreenId, screens, setScreens, setResultStatus } = useContext(Defaultcontext);

    const [cvc, setCvc] = useState("");
    const [expiry, setExpiry] = useState("");
    const [focus, setFocus] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const paymentInvoice = () => {
        // axios.post("InvoicePayment", {
        //     header: {
        //         AppKey: "a04cfa7a159b48e9f7d73fb92ef9b3b9",
        //         Channel: "API",
        //         ChannelSessionId: "Fatura ödene deneme 1",
        //         ChannelRequestId: "Fatura ödene deneme 2",
        //     },
        //     Parameters: [
        //         {
        //             SubDealerCode: "",
        //             AssociationCode: selectedAssociation,
        //             CustomerNo: 3488017,
        //             Amount: selectedAssociation.InvoiceAmount,
        //             InvoiceMessageBag: selectedInvoice,
        //             PaymentEntry: {
        //                 AccountBranchCode: 9142,
        //                 AccountNumber: 3488017,
        //                 AccountSuffix: 357,
        //                 CurrencyCode: "TRY",
        //                 DealerCode: "",
        //                 SubDealerCode: "",
        //             },
        //             SourceAccount: {
        //                 CustomerNo: 3488017,
        //                 BranchCode: 9142,
        //                 AccountSuffix: 357,
        //                 CurrencyCode: "TRY",
        //             }

        //         }
        //     ]
        // })
        //     .then(result => {
        //         console.log(result)
        //         if (result.data.Error) {
        //             console.log(result.data.Error)
        //             alert(result.data.Error.Description)
        //         }
        //         else {
        //             console.log(result.data.Data.Response)
        //         }


        //     })
        flatlist.current.scrollToIndex({ animated: true, index: 4 })
        setScreenId(4)
        screens[4].pageName = "Ödeme başarılı"
        setScreens(screens);
        setResultStatus(2)
    }

    return (
        <View style={styles.main}>

            <View style={{ marginBottom: 20 }}>
                <Cards
                    cvc={cvc}
                    expiry={expiry}
                    focused={focus}
                    name={name}
                    number={number}
                    placeholders={
                        {
                            name: "KART ÜZERİNDE YAZAN İSİM",

                        }
                    }

                />
            </View>
            <TextBox
                placeholder="Kart numarası"
                onChangeText={setNumber}
            />
            <TextBox
                placeholder="Kart üzerinde yazan isim"
                onChangeText={setName}
            />
            <View style={{ flexDirection: 'row', }}>
                <TextBox
                    placeholder="Son kullanım tarihi AA/YY"
                    onChangeText={setExpiry}
                />
                <View style={{ width: 10, height: 50 }}>

                </View>
                <TextBox
                    placeholder="Güvenlik kodu (CVV)"
                    onChangeText={setCvc}
                />
            </View>
            <Button label="Öde" onPress={() => paymentInvoice()} />
        </View>
    )
}

export default InvoicePayment

const styles = StyleSheet.create({
    main: {
        width: 500,
        height: 530,
        borderRadius: 10,
        backgroundColor: 'white',

    },
})
