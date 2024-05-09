import { createSlice } from "@reduxjs/toolkit";
import { AuthState, CurrentUser } from "../../interfaces/auth";
import { jwtParser } from "../../utils/jwtParser.ts";

const initialState: AuthState = {
    user: jwtParser(localStorage.getItem("authToken")) as CurrentUser,
    token: localStorage.getItem("authToken") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: { payload: { user: CurrentUser; accessToken: string } }) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("authToken");
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;