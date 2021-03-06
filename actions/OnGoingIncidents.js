import {
    REQUEST_ONGOING_INCIDENTS, RECEIVE_ONGOING_INCIDENTS, REQUEST_ONGOING_INCIDENTS_FAIL
} from '../actions/ActionTypes'

function requestOnGoingIncidents() {
    return {
        type: REQUEST_ONGOING_INCIDENTS
    };
}

function receiveOnGoingIncidents(incidents, onIncidentVolunteersChangeCb) {
    return {
        type: RECEIVE_ONGOING_INCIDENTS,
        incidents: incidents,
        onIncidentVolunteersChangeCb: onIncidentVolunteersChangeCb
    };
}

function requestOnGoingIncidentsFail(error) {
    return {
        type: REQUEST_ONGOING_INCIDENTS_FAIL,
        error: error
    };
}

export function fetchOnGoingIncidents(userId, userToken, location, onIncidentVolunteersChangeCb) {
    const config = ({
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken
        },
        credentials: 'same-origin'
    });
    return function (dispatch) {
        dispatch(requestOnGoingIncidents());
        return fetch(`http://localhost:3000/emergencies?volunteer_id=${userId}&volunteer_location=${location}`, config)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw response.status;
                }
            })
            .then(json => dispatch(receiveOnGoingIncidents(json, onIncidentVolunteersChangeCb)))
            .catch(error => dispatch(requestOnGoingIncidentsFail(error)))
    }
}
