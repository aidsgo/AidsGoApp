import {connect} from 'react-redux'
import {fetchMineIncidents} from '../actions/MineIncidents'
import {fetchOnGoingIncidents} from '../actions/OnGoingIncidents'
import {volunteerChangedForIncident, volunteerLocationChanged} from '../actions/Volunteers'
import IncidentList from '../components/IncidentList'

const mapStateToProps = (state, ownProps) => {

    const onGoingIncidentIds = state.onGoingIncidents.items;
    const mineIncidentIds = state.mineIncidents.items;

    let onGoingIncidents = [];
    onGoingIncidentIds.forEach(id => {
        onGoingIncidents.push(state.incidents[id]);
    });
    let mineIncidents = [];
    mineIncidentIds.forEach(id => {
        mineIncidents.push(state.incidents[id]);
    });

    return {
        onGoingIncidents: onGoingIncidents,
        mineIncidents: mineIncidents,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const onVolunteerLocationChangedCb = (volunteerId, location) => {
        dispatch(volunteerLocationChanged(volunteerId, location))
    };

    const onIncidentVolunteersChangeCb = (incidentId, volunteers) => {
        dispatch(volunteerChangedForIncident(incidentId, volunteers, onVolunteerLocationChangedCb))
    };

    return {
        fetchOngoingIncidents: (userToken) => {
            dispatch(fetchOnGoingIncidents(userToken, fetchOnGoingIncidents(onIncidentVolunteersChangeCb)))
        },
        fetchMineIncidents: (userId, userToken) => {
            dispatch(fetchMineIncidents(userId, userToken))
        }
    }
};

const IncidentListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(IncidentList);

export default IncidentListContainer
