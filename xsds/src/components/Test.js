import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'
import { addUser } from '../actions/usersActions'

class Test extends React.Component {
    constructor(props) {
        super(props)
        
        this.onAddUser = this.onAddUser.bind(this)
    }

    onAddUser() {
        this.props.onAddUser("Berkay")
    }

    render() {
        return (
            <View>
                <Text>Partially Working</Text>
                <TouchableHighlight
                    onPress={this.onAddUser}
                    style={{backgroundColor: "blue"}}
                >
                    <Text>Bana Bas</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users
})

const mapActionsToProps = {
    onAddUser: addUser
}

export default connect(mapStateToProps, mapActionsToProps)(Test)