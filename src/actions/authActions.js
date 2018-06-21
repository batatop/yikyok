import firebase from "react-native-firebase";

var db = firebase.database();

export function checkUser() {
    return (dispatch) => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                let ref = db.ref(`users/${user.uid}`);
                
                ref.once('value', (snapshot) => {
                    if(snapshot.val() == null) {
                        ref.set({
                            uid: user.uid,
                            school: "noSchool",
                            history: {
                                upvotes: 0,
                                downwotes: 0
                            }
                        })
                    }
                    ref.on('value', (snapshot) => {
                        dispatch({
                            type: "AUTH_SET_USER",
                            payload: snapshot.val()
                        })
                    }, (error) => {
                        const { code, message } = error;
                        console.log(message)
                    });
                });
                let postRef = db.ref(`posts/`);
                postRef.on('value', (snapshot) => {
                    dispatch({
                        type: "POST_GET_POST",
                        payload: snapshot.val()
                    })
                });
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
            .then((result) => {
                const codeInput = "111111" // Temp value
                
                if (result && codeInput.length) {
                    result.confirm(codeInput)
                        .catch((error) => {
                            const { code, message } = error;
                            console.log(message)
                        })
                }
            })
            .catch((error) => {
                const { code, message } = error;
                console.log(message)
            })
    }
}

export function signOut(uid) {
    return (dispatch) => {
        firebase.auth().signOut()
            .then(() => {
                let ref = db.ref(`users/${uid}`);
                ref.off()
            })
            .catch(function (error) {
                const { code, message } = error;
                console.log(message)
            });
    }
}

export function makePost(post) {
    return (dispatch) => {
        let postsRef = db.ref(`posts`)
        let postKey = postsRef.push().key

        postsRef.child(postKey).set({
            postId: postKey,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            title: post.title,
            content: post.content,
        })
    }
}

export function sendMessage(userId, post, message) {
    return (dispatch) => {
        let commentsRef = db.ref(`posts/${post}/comments`)
        let commentKey = commentsRef.push().key

        commentsRef.child(commentKey).set({
            commentId: commentKey,
            comment: message,
            user: userId,
        })
    }
}