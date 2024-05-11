import LoginPage from "./LoginPage.tsx";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import {RECAPTCHA_CLIENT_ID} from "../../utils/apiUrl.ts";

const Login = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_CLIENT_ID}>
            <LoginPage/>
        </GoogleReCaptchaProvider>
    );
}

export default Login;