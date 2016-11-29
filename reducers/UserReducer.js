import {ENTER_SUCCESS, ENTER_FAILURE, UPDATE_LOCATION} from '../actions/ActionTypes';

const user = (state={}, action) => {
    switch (action.type) {
        case UPDATE_LOCATION:
            return Object.assign({}, state, {
                location: action.location
            });
        case ENTER_SUCCESS:
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