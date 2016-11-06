import {
    REQUEST_ONGOING_INCIDENTS, RECEIVE_ONGOING_INCIDENTS, REQUEST_ONGOING_INCIDENTS_FAIL
} from '../actions/ActionTypes'

function requestOnGoingIncidents() {
    return {
        type: REQUEST_ONGOING_INCIDENTS
    };
}

function receiveOnGoingIncidents(incidents) {
    return {
        type: RECEIVE_ONGOING_INCIDENTS,
        incidents: incidents
    };
}

function requestOnGoingIncidentsFail(error) {
    return {
        type: REQUEST_ONGOING_INCIDENTS_FAIL,
        error: error
    };
}

export function fetchOnGoingIncidents() {
    return function (dispatch) {
        dispatch(requestOnGoingIncidents());
        return fetch('http://localhost:3000/emergencies?name=name&volunteer_location={lat:34.256403,lng:108.953661}')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw response.status;
                }
            })
            .then(json => dispatch(receiveOnGoingIncidents(json)))
            .catch(error => dispatch(requestOnGoingIncidentsFail(error)))
    }
}
