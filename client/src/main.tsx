import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {store} from "./store";
import {ToastContainer} from "react-toastify";
import {GoogleOAuthProvider} from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="688315354046-isd3q5qkjaj88uaj9oudrldsf18bm592.apps.googleusercontent.com">
            <BrowserRouter>
                <App/>
                <ToastContainer/>
            </BrowserRouter>
        </GoogleOAuthProvider>
    </Provider>,
)
