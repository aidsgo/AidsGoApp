import {SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions/ActionTypes';

function signUpSuccess(userInfo) {
    console.log('signUpSuccess', userInfo);
    return {
        type: SIGNUP_SUCCESS,
        userInfo: userInfo
    };
}

function signUpFailure() {
    return {
        type: SIGNUP_FAILURE
    };
}

export const userSignUp = (phoneNumber, password) => {
    const body = JSON.stringify(
        {
            "phoneNumber": phoneNumber,
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
        return fetch(`http://localhost:3000/volunteer/sign_up`, config)
            .then(checkStatus).then(parseJson, redirect)
            .then(json => dispatch(signUpSuccess(json)))
            .catch(error => dispatch(signUpFailure(error)));
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
    const errorResponse = error.response;
    //if(errorResponse && errorResponse.status === 401) {
    //    errorResponse.json().then((data) => {
    //        if(data && data.login_url) {
    //            window.location.href = data.login_url;
    //        }
    //    });
    //}

    throw error;
};