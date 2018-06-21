export default function reducer(state = "noPost", action) {
    switch (action.type) {
        case "POST_GET_POST":
            return action.payload;
        default:
            return state;
    }
}