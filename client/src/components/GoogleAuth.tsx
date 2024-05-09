import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginWithGoogleMutation } from "../services/auth.ts";
import { setCredentials } from "../store/slice/authSlice.ts";
import { useAppDispatch } from "../store";
import { CurrentUser, LoginGoogle } from "../interfaces/auth";
import { jwtParser } from "../utils/jwtParser.ts";
import showToast from "../utils/showToast.ts";

const GoogleAuth = () => {
    const [login] = useLoginWithGoogleMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const authSuccess = async (credentialResponse: CredentialResponse) => {
        const {credential} = credentialResponse;
        console.log("Token google", credential);
        const googleResponse: LoginGoogle = jwtDecode(credential as string);
        const idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzYjc2MmY4NzFjZGIzYmFlMDA0NGM2NDk2MjJmYzEzOTZlZGEzZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0NDg5MTQ3Nzg5MTAtbmxpdGxudDE3dHNsOWZsNWZpYWc4MTVlZHNpYTk1ZGMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0NDg5MTQ3Nzg5MTAtbmxpdGxudDE3dHNsOWZsNWZpYWc4MTVlZHNpYTk1ZGMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDY4MDUzMDYwMTM4ODcyOTI1NjIiLCJlbWFpbCI6Imxhc2hjaGFudG9uQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MTUyNzc0MzMsIm5hbWUiOiLQkNC90YLQvtC9INCb0LDRiSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLdGZPVnZILXNYYTBPSUtEYUFQVFhZRkpVSVZvODdZOWowRVYzQTNYWmcyZDJSSGhRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6ItCQ0L3RgtC-0L0iLCJmYW1pbHlfbmFtZSI6ItCb0LDRiSIsImlhdCI6MTcxNTI3NzczMywiZXhwIjoxNzE1MjgxMzMzLCJqdGkiOiJkMjk0NWM5YjFmNDYzNDUyNjAzYTRiMGEwMjNmY2UyN2VjNTk5MzM1In0.nkz4ICZoxepaSbRdt6Js_hxHrLXlNUsqacWG3SaPNMJ538X14WYfw2HQSr0vhAkYP8gcL9svjOocQtAbzaVV3CuauKNxhrQZJ1jXgBB8UrDIzdoFROgolqGCc9sy2_m77oY6OYBfsnDYRcy4hFtp5b872ydWVRmBcl3msqkt1WhCGuqSLINy0y-rMw6ahWCYMEqEZxjhyTbjHk6anfQlzEb5o47e5rq9rhz_Oud-BO37TqpYe2sD70-vXk7lL8SNC8_Ara0XSaqJ1GoFgmMXJOCy1T5M8UBMXs6VDGm9fRXTFGVtcNUOW8J-tu016gKDArEKSXqplGL7BH2GSxTVJQ";
        const res = await login({
            token: idToken || ""
            // name: googleResponse.name,
            // email: googleResponse.email,
            // image: googleResponse.picture,
        });

        if ("data" in res) {
            localStorage.setItem("authToken", res.data.token);

            dispatch(
                setCredentials({ user: jwtParser(res.data.token) as CurrentUser, accessToken: res.data.token }),
            );

            const { from } = location.state || { from: { pathname: "/" } };
            navigate(from);

            showToast(`Login successful!`, "success");
        } else {
            showToast(`Error login. Check login data!`, "error");
        }
    };

    const authError = () => {
        showToast(`Error login. Check your Gmail account!`, "error");
    };

    return <GoogleLogin onSuccess={authSuccess} onError={authError} />;
};

export default GoogleAuth;