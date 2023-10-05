import axios from "axios";
import { showAlert } from "../components/showAlert";
import { IDataRegister } from "../@types/userdata";
import { buildTrxNum } from "../util/textutil";

export async function getConsent() {
    try {
        console.log('getConsent')
        console.log(axios.defaults.baseURL)
        const response = await axios.post('/auth/get_consent', {
            "trx_num": "1"
        })
        console.log(response.data)
        if (response.status == 200) {
            if (response.data['status'] == '200') {
                return response.data['data']
            } else {
                showAlert('Info', response.data['message'])
            }
        }
        return;
    } catch (error) {
        console.error(error);
        showAlert('Error', `${error}`)
    }
}

export async function postRegister(data: IDataRegister) {
    try {
        console.log(data)
        const response = await axios.post('/auth/register', {
            "trx_num": data.trx_num,
            "name": data.name,
            "email": data.email,
            "email_partner": data.email_partner,
            "password": data.password,
            "no_hp": data.no_hp,
            "pin": data.pin,
            "tac": data.tac,
            "privacy": data.privacy,
            "pernyataan_data": data.pernyataan_data,
            "persetujuan_pelanggan": data.persetujuan_pelanggan,
            "id_jns_otp": data.id_jns_otp
        })
        console.log(response.data)
        if (response.status == 200) {
            if (response.data['status'] == '200') {
                postOTP(data.no_hp, data.id_jns_otp)
                return response.data['data']
            } else {
                showAlert('Info', response.data['message'])
            }
        }
    } catch (error) {
        console.error(error);
        showAlert('Error', `${error}`)
    }
}

export async function postOTP(no_hp?: string, id_jns_otp?: string) {
    try {
        const payload = {
            "no_hp": no_hp,
            "trx_num": buildTrxNum(),
            "id_jns_otp": id_jns_otp
        }
        console.log(payload)
        const response = await axios.post('/auth/send_otp', payload)
        console.log(response.data)
        if (response.status == 200) {
            if (response.data['status'] == '200') {
                return response.data['data']
            } else {
                showAlert('Info', response.data['message'])
            }
        }
        // return;
    } catch (error) {
        console.error(error);
        showAlert('Error', `${error}`)
    }
}

export async function verifyOTP(no_hp?: string, otp?: string) {
    try {
        const payload = {
            "no_hp": no_hp,
            "trx_num": buildTrxNum(),
            "otp": otp
        }
        console.log(payload)
        const response = await axios.post('/auth/verify_otp', payload)
        console.log(response.data)
        if (response.status == 200) {
            if (response.data['status'] == '200') {
                return response.data['data']
            } else {
                showAlert('Info', response.data['message'])
            }
        }
        // return;
    } catch (error) {
        console.error(error);
        showAlert('Error', `${error}`)
    }
}
