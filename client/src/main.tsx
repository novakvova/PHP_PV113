import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {store} from "./store";
import {ToastContainer} from "react-toastify";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./utils/apiUrl.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <App/>
                <ToastContainer/>
            </BrowserRouter>
        </GoogleOAuthProvider>
    </Provider>,
)
