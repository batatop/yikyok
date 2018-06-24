import React from "react"
import { Dimensions } from "react-native"
import { connect } from 'react-redux'
import glamorous from 'glamorous-native'

import { signOut } from '../../actions/authActions';
import { lightText, secondary, appBackground } from "../../assets/styles/colors";
import { inputBorderWidth, inputPaddingSides, profileSubmitFontSize, profileSubmitSize } from "../../assets/styles/sizes";

class Profile extends React.Component {
    static navigationOptions = ({ screenProps, navigation }) => ({
        title: "Profile",
        headerStyle: {
            backgroundColor: secondary
        },
        headerTitleStyle: {
            width: Dimensions.get('window').width
        },
        headerTintColor: lightText
    });

    constructor(props) {
        super(props)
        this.onSignOutPressed = this.onSignOutPressed.bind(this)
    }

    onSignOutPressed() {
        this.props.onSignOut(this.props.user.uid)
    }

    render() {
        return (
            <ProfileView>
                <SubmitButton onPress={this.onSignOutPressed}><SubmitButtonText>Sign Out   </SubmitButtonText></SubmitButton>
            </ProfileView>
        );
    }
}

const ProfileView = glamorous.view({
    flex: 1,
    backgroundColor: appBackground,
    alignItems: 'center'
})

const SubmitButton = glamorous.touchableHighlight({
    backgroundColor: secondary,
    width: Dimensions.get("window").width - (2 * inputPaddingSides),
    height: profileSubmitSize,
    borderWidth: inputBorderWidth,
    borderColor: secondary,
    borderRadius: inputBorderWidth,
    alignItems: 'center',
    justifyContent: 'center'
})

const SubmitButtonText = glamorous.text({
    color: lightText,
    fontSize: profileSubmitFontSize,
    fontWeight: 'bold'
})


const mapStateToProps = (state) => {
    return ({
        user: state.user
    })
}

const mapActionsToProps = {
    onSignOut: signOut
}

export default connect(mapStateToProps, mapActionsToProps)(Profile);