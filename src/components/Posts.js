import React from "react"
import { View, Text, TouchableHighlight } from "react-native"
import { signOut } from '../actions/authActions';
import { connect } from 'react-redux'

class Posts extends React.Component {
    constructor(props) {
        super(props)

        this.onSignOutPressed = this.onSignOutPressed.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user != null) {
            this.props.screenProps.rootNavigation.navigate("Posts")
        }
        else {
            this.props.screenProps.rootNavigation.navigate("Login")
        }
    }

    onSignOutPressed() {
        this.props.onSignOut(this.props.user.uid)
    }

    render() {
        console.log(this.props.user)
        return(
            <View>
                <Text>Posts</Text>
                <TouchableHighlight onPress={this.onSignOutPressed}><Text>Sign Out</Text></TouchableHighlight>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.user
    })
};

const mapActionsToProps = {
    onSignOut: signOut
}

export default connect(mapStateToProps, mapActionsToProps)(Posts);