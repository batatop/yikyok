import React from 'react';
import { connect } from 'react-redux'

import Loading from './Loading'

class StartApp extends React.Component {
    constructor(props) {
        super(props)
        if (this.props.user != "noUser") {
            if (this.props.user != null) {
                this.props.screenProps.rootNavigation.navigate("PostNavigator")
            }
            else {
                this.props.screenProps.rootNavigation.navigate("Login")
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user != "noUser") {
            if (nextProps.user != null) {
                this.props.screenProps.rootNavigation.navigate("PostNavigator")
            }
            else {
                this.props.screenProps.rootNavigation.navigate("Login")
            }
        }
    }

    render() {
        return <Loading/>
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.user
    })
};

export default connect(mapStateToProps)(StartApp);