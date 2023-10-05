import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as assets from '../../constants/assets';
import * as variables from '../../constants/variables';
import Header from '../../components/Header';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../router/router';
import Loader from '../../components/Loader';
import { getConsent, postRegister } from '../../service/signUpService';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { SignUpContext } from '../../context/SignUpContext';
import { buildTrxNum, getDate, getFormatedDate } from '../../util/textutil';


const PernyataanDataScreen: React.FC = () => {

    const navigation = useNavigation<StackNavigation>();
    const cRegister = useContext(SignUpContext);
    const data = cRegister?.data!

    const [loading, setLoading] = useState(false);
    const [desc, setDesc] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const consent = await getConsent()
                setDesc(consent)
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])

    async function submit() {
        try {
            let dateNow = getFormatedDate()
            const payload = {
                trx_num: buildTrxNum(),
                name: data.name,
                email: data.email,
                email_partner: data.email_partner,
                password: data.password,
                no_hp: data.no_hp,
                pin: data.pin,
                tac: dateNow,
                privacy: dateNow,
                pernyataan_data: dateNow,
                persetujuan_pelanggan: dateNow,
                id_jns_otp: data.id_jns_otp,
            }

            setLoading(true)
            const response = await postRegister(payload)
            setLoading(false)

            if (response) {
                navigation.navigate('OTP')
            }

        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={variables.globalContainer}>
            <Header title='Pernyataan Data' />

            {loading && < Loader />}
            <ScrollView showsVerticalScrollIndicator={false}>
                <AutoHeightWebView
                    style={{ width: variables.deviceWidth / 1.2, marginVertical: variables.responsiveHeight(2) }}
                    source={{ html: desc }}
                    overScrollMode='never'
                />

                <ButtonPrimary
                    title='Selanjutnya'
                    onPress={submit}
                // onPress={() => navigation.navigate('OTP')}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        color: 'black',
        fontWeight: '400',
        marginHorizontal: variables.responsiveWidth(3),
        marginVertical: variables.responsiveHeight(3),
        fontSize: 15,
        textAlign: 'justify'
    }
})

export default PernyataanDataScreen