import {
    REQUEST_ONGOING_INCIDENTS, RECEIVE_ONGOING_INCIDENTS, REQUEST_ONGOING_INCIDENTS_FAIL, RESOLVE_INCIDENT_SUCCESS
} from '../actions/ActionTypes'
import wilddog from 'wilddog';

var config = {
    authDomain: "bestaidsgo.wilddog.com",
    syncURL: "https://bestaidsgo.wilddogio.com/data/activeIncidents"
};

wilddog.initializeApp(config);
let incidentsRef = wilddog.sync().ref();

const onGoingIncidents = (state = {isFetching: false, items: [], refs: [], error: null}, action) => {
    switch (action.type) {
        case REQUEST_ONGOING_INCIDENTS:
            return Object.assign({}, state, {
                isFetching: true,
                error: null
            });
        case RECEIVE_ONGOING_INCIDENTS:
            let incidentIds = Object.keys(action.incidents);

            incidentIds.forEach(incidentId => {
                setTimeout(function () {
                    incidentsRef.child(`${incidentId}/volunteers`).on("value", function (snapshot) {
                        action.onIncidentVolunteersChangeCb(incidentId, snapshot.val());
                    });
                }, 0);
            });

            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                items: incidentIds
            });
        case REQUEST_ONGOING_INCIDENTS_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        case RESOLVE_INCIDENT_SUCCESS:
            const index = state.items.indexOf(action.incidentId);
            const newItems = [...state.items];
            if (index >= 0) {
                newItems.splice(index, 1);
            }
            return Object.assign({}, state, {items: newItems});
        default:
            return state
    }
};

export default onGoingIncidents;
