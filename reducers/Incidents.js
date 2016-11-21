import {
    RECEIVE_ONGOING_INCIDENTS, RECEIVE_MINE_INCIDENTS, ACCEPT_INCIDENT_SUCCESS, RESOLVE_INCIDENT_SUCCESS, UPLOAD_IMAGE
} from '../actions/ActionTypes'

const incidents = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ONGOING_INCIDENTS:
            return Object.assign({}, state, action.incidents);
        case RECEIVE_MINE_INCIDENTS:
            return Object.assign({}, state, action.incidents);
        case ACCEPT_INCIDENT_SUCCESS:
            const incident = state[action.incidentId];
            const acceptedIncident = Object.assign({}, incident, {taken: [...incident.taken, action.userId]});
            return Object.assign({}, state, {[action.incidentId]: acceptedIncident});
        case RESOLVE_INCIDENT_SUCCESS:
            const resolvedIncident = Object.assign({}, state[action.incidentId], {resolved: true});
            return Object.assign({}, state, {[action.incidentId]: resolvedIncident});
        case UPLOAD_IMAGE:
            const oldImages = state[action.incidentId].images || [];
            const incidentWithNewImages = Object.assign({}, state[action.incidentId], {images: [...oldImages, action.image]});
            return Object.assign({}, state, {[action.incidentId]: incidentWithNewImages});
        default:
            return state
    }
};

export default incidents;