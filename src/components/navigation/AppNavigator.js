import React from 'react';
import { YellowBox } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux'

import { checkUser } from "../../actions/authActions"
import Login from '../Login'
import Posts from '../Posts'
import StartApp from '../StartApp'

// Temporarily disable isMounted warning - delete it after react-native is fixed
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const RootNavigator = createDrawerNavigator(
    {
        StartApp: {
            screen: ({ navigation }) =>
                <StartApp
                    screenProps={{
                        rootNavigation: navigation
                    }}
                />
        },
        Login: {
            screen: ({ navigation }) =>
                <Login
                    screenProps={{
                        rootNavigation: navigation
                    }}
                />
        },
        Posts: {
            screen: ({ navigation }) =>
                <Posts
                    screenProps={{
                        rootNavigation: navigation
                    }}
                />
        }
    },
    {
        navigationOptions: {
            drawerLockMode: 'locked-closed'
        }
    }
)

class AppNavigator extends React.Component {
    constructor(props) {
        super(props)
        this.props.onCheckUser()
    }

    render() {
        return <RootNavigator/>
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.user
    })
};

const mapActionsToProps = {
    onCheckUser: checkUser
}

export default connect(mapStateToProps, mapActionsToProps)(AppNavigator);