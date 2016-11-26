import {connect} from 'react-redux'
import {acceptIncident, resolveIncident, uploadImage,setMyCurrentLocation} from '../actions/Incident'
import IncidentDetails from '../components/IncidentDetails'

const mapStateToProps = (state, ownProps) => {
    return {
        incident: state.incidents[ownProps.incident.id],
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onIncidentAccept: (incidentId, userId) => {
            dispatch(acceptIncident(incidentId, userId))
        },
        onIncidentResolve: (incidentId, userId) => {
            dispatch(resolveIncident(incidentId, userId))
        },
        onImageUpload: (incidentId, image) => {
            dispatch(uploadImage(incidentId, image))
        },
        setMyCurrentLocation: ()=>{
            dispatch(setMyCurrentLocation())
        }
    }
};


const IncidentDetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(IncidentDetails);

export default IncidentDetailsContainer
