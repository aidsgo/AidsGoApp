import {
    ACCEPT_INCIDENT_REQUEST, ACCEPT_INCIDENT_SUCCESS, ACCEPT_INCIDENT_FAILURE,
    RESOLVE_INCIDENT_REQUEST, RESOLVE_INCIDENT_SUCCESS, RESOLVE_INCIDENT_FAILURE,
    UPLOAD_IMAGE
} from '../actions/ActionTypes'

function acceptIncidentRequest() {
    return {
        type: ACCEPT_INCIDENT_REQUEST
    };
}

function acceptIncidentSuccess(incidentId, userId) {
    return {
        type: ACCEPT_INCIDENT_SUCCESS,
        incidentId: incidentId,
        userId: userId
    };
}

function acceptIncidentFailure(error) {
    return {
        type: ACCEPT_INCIDENT_FAILURE,
        error: error
    };
}

function resolveIncidentRequest() {
    return {
        type: RESOLVE_INCIDENT_REQUEST
    };
}

function resolveIncidentSuccess(incidentId, userId) {
    return {
        type: RESOLVE_INCIDENT_SUCCESS,
        incidentId: incidentId,
        userId: userId
    };
}

function resolveIncidentFailure(error) {
    return {
        type: RESOLVE_INCIDENT_FAILURE,
        error: error
    };
}

export const acceptIncident = (incidentId, userId, userToken) => {
    const config = ({
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken
        },
        credentials: 'same-origin'
    });
    return function (dispatch) {
        dispatch(acceptIncidentRequest());
        return fetch(`http://localhost:3000/volunteers/${userId}/accept/${incidentId}/`, config)
            .then(response => {
                if (response.ok) {
                    return dispatch(acceptIncidentSuccess(incidentId, userId))
                } else {
                    throw response.status;
                }
            })
            .catch(error => dispatch(acceptIncidentFailure(error)))
    }
};

export const resolveIncident = (incidentId, userId, userToken) => {
    const config = ({
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken
        },
        credentials: 'same-origin'
    });

    return function (dispatch) {
        dispatch(resolveIncidentRequest());
        return fetch(`http://localhost:3000/volunteers/${userId}/resolve/${incidentId}/`, config)
            .then(response => {
                if (response.ok) {
                    return dispatch(resolveIncidentSuccess(incidentId, userId))
                } else {
                    throw response.status;
                }
            })
            .catch(error => dispatch(resolveIncidentFailure(error)))
    }
};

export const uploadImage = (incidentId, image) => {
    return {
        type: UPLOAD_IMAGE,
        incidentId: incidentId,
        image: image
    }
};


