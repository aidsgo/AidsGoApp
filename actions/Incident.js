import {
    ACCEPT_INCIDENT_REQUEST, ACCEPT_INCIDENT_SUCCESS, ACCEPT_INCIDENT_FAILURE,
    RESOLVE_INCIDENT_REQUEST, RESOLVE_INCIDENT_SUCCESS, RESOLVE_INCIDENT_FAILURE,
    UPLOAD_IMAGE,SET_MY_CURRENT_LOC,GET_CUURENT_LOCS_STATUS
} from '../actions/ActionTypes'

import wilddog from  'wilddog';
var config = {
    authDomain: "aidsgo.wilddog.com",
    syncURL: "https://aidsgo.wilddogio.com"
};
wilddog.initializeApp(config);
let ref = wilddog.sync().ref();


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

function setMyCurrentLoction(){
    return{
        type:SET_MY_CURRENT_LOC
    }
}

function testSet(){
    ref.set({
        "incidents":{
            "user1":{
                "lan":1 + Math.round(Math.random()*10),
                "log":2 + Math.round(Math.random()*10)
            }
        }
    })

}

export const setMyCurrentLocation = () => {
    return function (dispatch) {
        dispatch(setMyCurrentLoction());
        return setInterval(testSet,3000)
    }
};

export const acceptIncident = (incidentId, userId) => {
    return function (dispatch) {
        dispatch(acceptIncidentRequest());
        return fetch(`http://localhost:3000/emergencies/${incidentId}/add/${userId}`, {method: 'PUT'})
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

export const resolveIncident = (incidentId, userId) => {
    return function (dispatch) {
        dispatch(resolveIncidentRequest());
        return fetch(`http://localhost:3000/emergencies/${incidentId}/resolve/${userId}`, {method: 'PUT'})
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

export const uploadImage = (id, image) => {
    return {
        type: UPLOAD_IMAGE,
        id: id,
        image: image
    }
};


