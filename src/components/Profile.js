import React from "react"
import { View, Text, TouchableHighlight } from "react-native"
import { connect } from 'react-redux'

import { signOut } from '../actions/authActions';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.onSignOutPressed = this.onSignOutPressed.bind(this)
    }

    onSignOutPressed() {
        this.props.onSignOut(this.props.user.uid)
    }

    render() {
        return (
            <View>
                <Text>Profile</Text>
                <TouchableHighlight onPress={this.onSignOutPressed}><Text>Sign Out</Text></TouchableHighlight>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.user
    })
}

const mapActionsToProps = {
    onSignOut: signOut
}

export default connect(mapStateToProps, mapActionsToProps)(Profile);