import {
    REQUEST_HELP_INSTRUCTIONS, RECEIVE_HELP_INSTRUCTIONS, REQUEST_HELP_INSTRUCTIONS_FAIL
} from '../actions/ActionTypes'

function requestHelpInstructions() {
    return {
        type: REQUEST_HELP_INSTRUCTIONS
    };
}

function receiveHelpInstructions(instructions) {
    return {
        type: RECEIVE_HELP_INSTRUCTIONS,
        instructions: instructions
    };
}

function requestHelpInstructionsFail(error) {
    return {
        type: REQUEST_HELP_INSTRUCTIONS_FAIL,
        error: error
    };
}

export function fetchHelpInstructions() {
    return function (dispatch) {
        dispatch(requestHelpInstructions());
        return fetch('https://aidsgo.wilddogio.com/data.json')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw response.status;
                }
            })
            .then(json => dispatch(receiveHelpInstructions(json)))
            .catch(error => dispatch(requestHelpInstructionsFail(error)))
    }
}
