import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'

import Loading from './Loading'
import Login from './Login'
import Posts from "./Posts"

class StartApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: "+1" };
    }

    render() {
        if(this.props.user != "noUser") { // noUser caseinin degistir
            if(this.props.user != null) {
                return <Posts/>
            }
            else {
                return <Login/>
            }
        }
        else {
            return <Loading/>
        }
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.user
    })
};

export default connect(mapStateToProps)(StartApp);