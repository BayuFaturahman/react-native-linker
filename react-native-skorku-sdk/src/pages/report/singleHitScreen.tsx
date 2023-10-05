import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as assets from '../../constants/assets';
import * as variables from '../../constants/variables';
import Header from '../../components/Header';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../router/router';
import { showAlert } from '../../components/showAlert';
import Loader from '../../components/Loader';
import { SignUpContext } from '../../context/SignUpContext';
import { getReport } from '../../service/creditService';


const SingleHitScreen: React.FC = () => {

    const navigation = useNavigation<StackNavigation>();
    const cRegister = useContext(SignUpContext);
    const data = cRegister?.data!

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {

            } catch (error) {

            }
        })();
    }, [])

    async function submit() {
        try {

            setLoading(true)
            const response = await getReport(data)
            setLoading(false)

            if (response) {
                if (response['is_mail_sent'] == 0) {
                    showAlert('Info', 'Laporan gagal terkirim ke email')
                } else {
                    navigation.navigate('ReportSuccess')
                }
            }

        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title='SKORKU'
                backgroundColor={variables.colors.primary}
                contentColor='white'
                left={variables.responsiveWidth(4)}
                hideIconBack
            />

            {loading && < Loader />}
            <View style={variables.globalContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        position: 'relative',
                        justifyContent: 'center',
                        height: variables.deviceHeight - variables.responsiveHeight(13),
                    }}>
                        <ButtonPrimary
                            title='Dapatkan Laporan'
                            onPress={submit}
                        // onPress={() => navigation.navigate('ReportSuccess')}
                        />

                    </View>
                </ScrollView>
            </View>
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

export default SingleHitScreen