import {connect} from 'react-redux'
import {userSignUp} from '../actions/User'
import Login from '../components/Login'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        userSignUp: (phoneNumber, password) => {
            dispatch(userSignUp(phoneNumber, password))
        }
    }
};

const UserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default UserContainer;
