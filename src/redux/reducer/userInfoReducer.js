import { createSlice } from "@reduxjs/toolkit";
import { REDUCER_NAME, ACTION_NAME } from "./constants";
import { aysncField, success, fetch } from "./asyncField";

//the name of these reducer can be regarded as type name
export const userInfoInitialState = {
    ids: [],
    isAuthenticated: false,
    isAuthenticating: false,
    profileInfo: aysncField(),
    user: aysncField(),
    currentUser: "",
    registerAuth: {
        email: '',
        password: '',
    },
    registerInfo: {
        name: "",
        age: '',
        gender: '',
        zipCode: '',
    }
}

const userInfoReducer = createSlice({
    name: REDUCER_NAME.userSettingReducer,
    initialState: {
        ...userInfoInitialState,
    },
    reducers: {
        //register
        [ACTION_NAME.registerEmail]: (state, action) => {
            state.registerAuth.email = action.payload
        },
        [ACTION_NAME.registerPassword]: (state, action) => {
            state.registerAuth.password = action.payload
        },
        //set current login user
        [ACTION_NAME.setCurrentUser]: (state, action) => {
            console.log(`reducer, password: `+  action.payload)
            state.currentUser= action.payload
        },

        //authentication
        [ACTION_NAME.fetchUserInfo]: (state, action) => {
            state.user = fetch(state.user);
        },
        [ACTION_NAME.fetchUserInfoSuccess]: (state, action) => {
            console.log({ payload: action.payload, action})
            state.user = success(state.user, action.payload)
        },
        [ACTION_NAME.fetchUserInfoFailure]: (state, action) => {},

        [ACTION_NAME.register]: (state, action) => {
            console.log("reducer register", action.payload)
        },
        [ACTION_NAME.loginStatus]: (state, action) => {
            console.log("reducer", action.payload)
        },
        [ACTION_NAME.setAuthenticationStatus]: (state, action) => {
            state.profileInfo = success(state.authenticationInfo, action.payload);
            state.isAuthenticated = !!action.payload;
        },
        [ACTION_NAME.updateProfileInfo]: (state, action) => {
            console.log(action.payload, "updateProfileInfo")
            //would fixed here in future
            state.user = action.payload.user
        },
        [ACTION_NAME.setAuthenticating]: (state, action) => {
            state.isAuthenticating = action.payload.isAuthenticating
        },

        [ACTION_NAME.logoutStatus]: (state) => {
            state.profileInfo = aysncField(),
            state.isAuthenticated = false;
        },
    }
})

//these are the actions
export const {
    updateProfileInfo, 
    fetchUserInfo,
    fetchUserInfoSuccess,
    setAuthenticating, 
    loginStatus, 
    logoutStatus, 
    setAuthenticationStatus, 
    register , 
    pluseOne, 
    addItems, 
    removeItems,
    registerEmail,
    registerPassword,
    setCurrentUser,
} = userInfoReducer.actions

export const stateSelector = (state) => state;
export const uidSelector = (state) => state.userInfomation.profileInfo.uid
export const userSelector = (state) => state.userInfomation.user
export const registerAuth = (state) => state.userInfomation.registerAuth
export const currentUser = (state) => state.userInfomation.currentUser
//selectorName = (state) => state[slice.name].selectorName
//3rdEyeFirstReducer/setAuthenticationStatus

export default userInfoReducer.reducer;