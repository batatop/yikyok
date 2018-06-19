export function addUser(user) {
    return {
        type: "USERS_ADD_USER",
        payload: {
            name: user
        }
    }
}