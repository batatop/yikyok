import React from 'react';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import { signIn } from '../actions/authActions';
import { connect } from 'react-redux'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "+1"
        }

        this.handlePress = this.handlePress.bind(this)
    }

    handlePress() {
        this.props.onSignIn(this.state.text)
    }

    render() {
        return (
            <View>
                <Text>Login</Text>
                <TextInput
                    style={{ borderColor: 'black', borderWidth: 1 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <TouchableHighlight onPress={this.handlePress}><Text>Submit</Text></TouchableHighlight>
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
    onSignIn: signIn
}

export default connect(mapStateToProps, mapActionsToProps)(Login);