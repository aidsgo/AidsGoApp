import {connect} from 'react-redux'
import {acceptIncident, resolveIncident, uploadImage} from '../actions/incident'
import IncidentDetails from '../components/IncidentDetails'

const mapStateToProps = (state, ownProps) => {
    return {
        incident: state.incidents.find(incident => {
            return incident.id === ownProps.incident.id;
        }),
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onIncidentAccept: () => {
            dispatch(acceptIncident(ownProps.incident.id, ownProps.user.id))
        },
        onIncidentResolve: () => {
            dispatch(resolveIncident(ownProps.incident.id, ownProps.user.id))
        },
        onImageUpload: (image) => {
            dispatch(uploadImage(ownProps.incident.id, image))
        }
    }
};


const IncidentDetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(IncidentDetails);

export default IncidentDetailsContainer
