export default function reducer(state = "noUser", action) {
    switch (action.type) {
        case "AUTH_SIGN_IN":
            return action.payload;
        case "AUTH_SET_USER":
            return action.payload;
        default:
            return state;
    }
}