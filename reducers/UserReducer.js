import {ENTER_SUCCESS, ENTER_FAILURE, UPDATE_LOCATION} from '../actions/ActionTypes';

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
        default:
            return state
    }
};
export default user;