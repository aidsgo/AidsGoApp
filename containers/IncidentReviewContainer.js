import {connect} from 'react-redux'
import IncidentReview from '../components/IncidentReview'

const mapStateToProps = (state, ownProps) => {
    return {
        incident: state.incidents[ownProps.incident.id]
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
};


const IncidentReviewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(IncidentReview);

export default IncidentReviewContainer
