import {SIGNUP_SUCCESS, SIGNUP_FAILURE} from '../actions/ActionTypes';

const user = (state={}, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                signedIn: true,
                profile: action.userInfo
            });
        case SIGNUP_FAILURE:
            return Object.assign({}, state, {
                signedIn: false
            });
        default:
            return state
    }
};
export default user;