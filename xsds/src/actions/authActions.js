import firebase from "react-native-firebase";

export function checkUser() {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                dispatch({
                    type: "AUTH_SET_USER",
                    payload: user
                })
            }
            else {
                dispatch({
                    type: "AUTH_SET_USER",
                    payload: null
                })
            }
        })
    }
}

export function signIn(phoneNumber) {
    return (dispatch) => {
        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then((confirmResult) => {
                dispatch({
                    type: "AUTH_SIGN_IN",
                    payload: confirmResult
                })
            })
            .catch((error) => {
                const { code, message } = error;
                console.log(message)
            });
    }
}