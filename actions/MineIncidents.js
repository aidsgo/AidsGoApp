import {
    REQUEST_MINE_INCIDENTS, RECEIVE_MINE_INCIDENTS, REQUEST_MINE_INCIDENTS_FAIL
} from '../actions/ActionTypes'

function requestMineIncidents() {
    return {
        type: REQUEST_MINE_INCIDENTS
    };
}

function receiveMineIncidents(incidents) {
    return {
        type: RECEIVE_MINE_INCIDENTS,
        incidents: incidents
    };
}

function requestMineIncidentsFail(error) {
    return {
        type: REQUEST_MINE_INCIDENTS_FAIL,
        error: error
    };
}

export function fetchMineIncidents(userId, userToken) {
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
        dispatch(requestMineIncidents());
        return fetch(`http://localhost:3000/volunteers/${userId}/emergencies`, config)
            .then(response => {
                if(response.status === 200) {
                    return response.json();
                }else {
                    throw response.status;
                }
            })
            .then(json => dispatch(receiveMineIncidents(json)))
            .catch(error => dispatch(requestMineIncidentsFail(error)))
    }
}
