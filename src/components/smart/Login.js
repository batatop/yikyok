import React from 'react';
import { Dimensions, Image, TextInput } from 'react-native';
import { signIn } from '../../actions/authActions';
import { connect } from 'react-redux'
import glamorous from 'glamorous-native'

import { appBackground, appTitle, secondary, secondaryDark, noteText } from '../../assets/styles/colors'
import { noteFontSize, titleTextSize, inputBorderWidth, inputBorderRadius, inputPaddingSides, loginSubmitPadding } from '../../assets/styles/sizes';

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
                            source={ require('../../assets/icons/signInIcon.png') }
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
    fontSize: titleTextSize,
    fontWeight: 'bold',
    top: '50%'
})

const TitleView = glamorous.view({
    flex: 0.3,
    alignItems: 'center',
})

const PhoneInputText = glamorous.text({
    color: noteText,
    fontSize: noteFontSize
})

const PhoneInputView = glamorous.view({
    borderWidth: inputBorderWidth,
    borderColor: secondary,
    borderRadius: inputBorderRadius
})

const PhoneView = glamorous.view({
    flex: 0.2,
    paddingLeft: inputPaddingSides,
    paddingRight: inputPaddingSides
})

const SubmitButton = glamorous.touchableHighlight({
    backgroundColor: secondary,
    borderRadius: Dimensions.get("window").width,
    padding: loginSubmitPadding
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