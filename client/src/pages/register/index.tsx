import RegisterPage from "./RegisterPage.tsx";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import {RECAPTCHA_CLIENT_ID} from "../../utils/apiUrl.ts";

const Register = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_CLIENT_ID}>
            <RegisterPage/>
        </GoogleReCaptchaProvider>
    );
}

export default Register;