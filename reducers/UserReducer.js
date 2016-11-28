import {ENTER_SUCCESS, ENTER_FAILURE} from '../actions/ActionTypes';

const user = (state={}, action) => {
    switch (action.type) {
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