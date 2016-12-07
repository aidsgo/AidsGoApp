import {VOLUNTEERS_CHANGED_FOR_INCIDENT, VOLUNTEER_LOCATION_CHANGED} from '../actions/ActionTypes'

import wilddog from 'wilddog';

var usersConfig = {
    authDomain: "bestaidsgo.wilddog.com",
    syncURL: "https://bestaidsgo.wilddogio.com/data/activeUsers"
};

wilddog.initializeApp(usersConfig);
let usersRef = wilddog.sync().ref();

const volunteers = (state = {}, action) => {
    switch (action.type) {
        case VOLUNTEERS_CHANGED_FOR_INCIDENT:
            let existedVolunteers = Object.keys(state);
            let newVolunteers = (action.volunteers || []).filter(userId => {
                return existedVolunteers.indexOf(userId) < 0;
            });
            newVolunteers.forEach(function (userId) {
                setTimeout(function () {
                    usersRef.child(`${userId}`).on("value", function (snapshot) {
                        action.onVolunteerLocationChangedCb(userId, snapshot.val());
                    });
                }, 0);
            });
            let newVolunteersWithLocation = {};
            newVolunteers.forEach(function (userId) {
                Object.assign(newVolunteersWithLocation, {[userId]: {}});
            });
            return Object.assign({}, state, newVolunteersWithLocation);
        case VOLUNTEER_LOCATION_CHANGED:
            return Object.assign({}, state, {[action.volunteerId]: action.location});
        default:
            return state
    }
};

export default volunteers;