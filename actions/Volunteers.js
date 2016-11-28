import {VOLUNTEERS_CHANGED_FOR_INCIDENT, VOLUNTEER_LOCATION_CHANGED} from '../actions/ActionTypes'

export const volunteerChangedForIncident = (incidentId, volunteers, onVolunteerLocationChangedCb) => {
    return {
        type: VOLUNTEERS_CHANGED_FOR_INCIDENT,
        incidentId: incidentId,
        volunteers: volunteers,
        onVolunteerLocationChangedCb: onVolunteerLocationChangedCb
    };
};


export const volunteerLocationChanged = (volunteerId, location) => {
    return {
        type: VOLUNTEER_LOCATION_CHANGED,
        volunteerId: volunteerId,
        location: location
    };
};
