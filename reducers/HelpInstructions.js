import {
    REQUEST_HELP_INSTRUCTIONS, RECEIVE_HELP_INSTRUCTIONS, REQUEST_HELP_INSTRUCTIONS_FAIL
} from '../actions/ActionTypes'

const helpInstructions = (state = {isFetching: false, items: [], error: null}, action) => {
    switch (action.type) {
        case REQUEST_HELP_INSTRUCTIONS:
            return Object.assign({}, state, {
                isFetching: true,
                error: null
            });
        case RECEIVE_HELP_INSTRUCTIONS:
            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                items: action.instructions
            });
        case REQUEST_HELP_INSTRUCTIONS_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        default:
            return state
    }
};

export default helpInstructions;