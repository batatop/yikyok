import React from 'react';
import { YellowBox } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux'

import { checkUser } from "../../actions/authActions"
import Comments from '../Comments'
import Login from '../Login'
import NewPost from '../NewPost'
import Posts from '../Posts'
import Profile from '../Profile';
import StartApp from '../StartApp'

// Temporarily disable isMounted warning - delete it after react-native is fixed
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const PostNavigator = createStackNavigator(
    {
        Posts: { screen: Posts },
        Comments: { screen: Comments },
        NewPost: { screen: NewPost },
        Profile: { screen: Profile }
    }
)

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
        PostNavigator: {
            screen: ({ navigation }) =>
                <PostNavigator
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