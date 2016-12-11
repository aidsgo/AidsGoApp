import {ENTER_SUCCESS, ENTER_FAILURE, UPDATE_LOCATION,
        UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE,
        UPLOAD_AVATAR} from '../actions/ActionTypes';

import ReactNative, {
    AsyncStorage,
} from 'react-native';


storeUserProfile = async (profile) => {
    try {
        await AsyncStorage.setItem("userProfile", profile);
    } catch (error) {
        console.log(error);
    }
};

const user = (state={}, action) => {
    switch (action.type) {
        case UPDATE_LOCATION:
            return Object.assign({}, state, {
                location: action.location
            });
        case ENTER_SUCCESS:
            storeUserProfile(JSON.stringify(action.userInfo));
            return Object.assign({}, state, {
                signedIn: true,
                profile: action.userInfo
            });
        case ENTER_FAILURE:
            return Object.assign({}, state, {
                signedIn: false
            });
        case UPDATE_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                profile: action.userInfo
            });
        case UPDATE_PROFILE_FAILURE:
        case UPLOAD_AVATAR:
            return {...state, profile: {avatar: action.image}};
        default:
            return state
    }
};
export default user;