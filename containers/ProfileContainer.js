import {connect} from 'react-redux'
import {updateProfile} from '../actions/User'
import {uploadImage} from '../actions/User'
import Profile from '../components/Profile'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateProfile: (user, userToken) => {
            dispatch(updateProfile(user, userToken))
        },
        onImageUpload: (image) => {
            dispatch(uploadImage(image))
        }
    }
};

const ProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

export default ProfileContainer;
