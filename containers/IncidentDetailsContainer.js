import {connect} from 'react-redux'
import {acceptIncident, resolveIncident, uploadImage} from '../actions/Incident'
import IncidentDetails from '../components/IncidentDetails'

const mapStateToProps = (state, ownProps) => {
    let incident = Object.assign({}, state.incidents[ownProps.incident.id]);
    incident.taken = new Map(incident.taken.map(volunteerId => {
        return [volunteerId, state.volunteers[volunteerId]]
    }));
    return {
        incident: incident,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onIncidentAccept: (incidentId, userId, userToken) => {
            dispatch(acceptIncident(incidentId, userId, userToken))
        },
        onIncidentResolve: (incidentId, userId, userToken) => {
            dispatch(resolveIncident(incidentId, userId, userToken))
        },
        onImageUpload: (incidentId, image) => {
            dispatch(uploadImage(incidentId, image))
        }
    }
};


const IncidentDetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(IncidentDetails);

export default IncidentDetailsContainer
