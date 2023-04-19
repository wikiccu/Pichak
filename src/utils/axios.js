import axios from 'axios';
export const getOtp = async (mobile) => {
    try {
        const result = await axios({
            method: 'post',
            url: 'http://localhost:8455/api/v1/chapar/sms/template/resend-otp',
            data: { phoneNumber: mobile, app: 'MUNICIPALITY' }
        });
        return result?.data?.result || 0;
    }
    catch (error) {
        console.warn(error);
        return 0;
    }
};
