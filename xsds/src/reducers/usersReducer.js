export default function reducer(state=[], action) {
    switch (action.type) {
        case "USERS_ADD_USER":
            return state.concat(action.payload);
        default:
            return state;
    }
}