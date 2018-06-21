import React from 'react';
import { Dimensions, Image, TextInput } from 'react-native';
import { signIn } from '../actions/authActions';
import { connect } from 'react-redux'
import glamorous from 'glamorous-native'

import { appBackground, appTitle, secondary, secondaryDark, noteText } from '../assets/styles/colors'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "+1"
        }

        this.handlePress = this.handlePress.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user != null) {
            this.props.screenProps.rootNavigation.navigate("PostNavigator")
        }
        else {
            this.props.screenProps.rootNavigation.navigate("Login")
        }
    }

    handlePress() {
        this.props.onSignIn(this.state.text)
    }

    render() {
        return (
            <PostsView>
                <TitleView>
                    <TitleText>Yikyok </TitleText>
                </TitleView>
                <PhoneView>
                    <PhoneInputText>Enter your phone number</PhoneInputText>
                    <PhoneInputView>
                        <TextInput
                            style={{ borderColor: 'black', borderWidth: 1 }}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />
                    </PhoneInputView>
                </PhoneView>
                <SubmitView>
                    <SubmitButton
                        onPress={this.handlePress}
                        underlayColor={secondaryDark}
                    >
                        <Image
                            source={ require('../assets/icons/signInIcon.png') }
                        />
                    </SubmitButton>
                </SubmitView>
            </PostsView>
        );
    }
}

const PostsView = glamorous.view({
    flex: 1,
    flexDirection: 'column',
    backgroundColor: appBackground,
})

const TitleText = glamorous.text({
    color: appTitle,
    fontSize: 45,
    fontWeight: 'bold',
    top: '50%'
})

const TitleView = glamorous.view({
    flex: 0.3,
    alignItems: 'center',
})

const PhoneInputText = glamorous.text({
    width: "95%",
    color: noteText
})

const PhoneInputView = glamorous.view({
    width: "95%",
    borderWidth: 3,
    borderColor: secondary,
    borderRadius: 6
})

const PhoneView = glamorous.view({
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
})

const SubmitButton = glamorous.touchableHighlight({
    top: "5%",
    backgroundColor: secondary,
    borderRadius: Dimensions.get("window").width,
    padding: 10
})

const SubmitView = glamorous.view({
    flex: 0.5,
    alignItems: 'center'
})

const mapStateToProps = (state) => {
    return ({
        user: state.user
    })
};

const mapActionsToProps = {
    onSignIn: signIn
}

export default connect(mapStateToProps, mapActionsToProps)(Login);