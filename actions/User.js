import {ENTER_SUCCESS, ENTER_FAILURE, UPDATE_LOCATION,
        UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE,
        UPLOAD_AVATAR} from '../actions/ActionTypes';

function enterSuccess(userInfo) {
    return {
        type: ENTER_SUCCESS,
        userInfo: userInfo
    };
}

function enterFailure() {
    return {
        type: ENTER_FAILURE
    };
}

export const updateSuccess = (userInfo) => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        userInfo: userInfo
    }
};

export const updateFailure = () => {
    return {
        type: UPDATE_PROFILE_FAILURE
    }
};

export const updateLocation = (location) => {
    return {
        type: UPDATE_LOCATION,
        location: location
    }
};

export const userEnter = (action, phoneNumber, password) => {
    const fetchURL = (action === 'logIn') ? 'http://localhost:3000/volunteers/login' : 'http://localhost:3000/volunteers/sign_up';
    const body = JSON.stringify(
        {
            "phone_number": phoneNumber,
            "password": password
        }
    );
    const config = ({
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body
    });

    return function (dispatch) {
        return fetch(fetchURL, config)
            .then(checkStatus).then(parseJson, redirect)
            .then(json => dispatch(enterSuccess(json)))
            .catch(error => dispatch(enterFailure(error)));
    }
};

export const updateProfile = (user, userToken) => {
    const fetchURL = 'http://localhost:3000/volunteers/update';
    const body = JSON.stringify(
        {user: user}
    );
    const config = ({
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userToken
        },
        credentials: 'same-origin',
        body
    });
    return function (dispatch) {
        return fetch(fetchURL, config)
            .then(checkStatus).then(parseJson, redirect)
            .then(json => dispatch(updateSuccess(json)))
            .catch(error => dispatch(updateFailure(error)));
    }
};

export const uploadImage = (image) => {
    return {
        type: UPLOAD_AVATAR,
        image: image
    }
};

const checkStatus = (response) => {
    const status = response.status;
    if(status < 200 || status >= 300) {
        const error = new Error(status);
        error.response = response;

        throw error;
    }

    return response;
};

const parseJson = (response) => {
    return response.json();
};

const redirect = (error) => {
    throw error;
};