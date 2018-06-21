import React from "react"
import { sendMessage } from '../actions/authActions';
import { View, Text, TextInput, Button } from "react-native"
import { connect } from 'react-redux'

function renderMessages(comments) {
    let array = []
    for (let key in comments) {
        if (comments.hasOwnProperty(key)) {
            array.push(comments[key])
        }
    }
    return array
}

class Comments extends React.Component {
    submitMessage() {
        this.props.onSendMessage(this.props.user.uid, this.props.navigation.state.params.postObj.postId, this.state.message)
    }

    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.submitMessage = this.submitMessage.bind(this)
    }
    render() {
        let mark = this.props.navigation.state.params.postObj
        return (
            <View>
                <Text>Post{"\n"}</Text>
                <Text>{mark.title}{"\n"}</Text>
                <Text>{mark.content}{"\n"}</Text>
                <TextInput onChangeText={(message) => this.setState({ message })}></TextInput>
                {
                    renderMessages(this.props.posts[mark.postId].comments).map(obj =>
                        <View>
                            <Text>{obj.comment}{"\n"}</Text>
                        </View>
                    )
                }
                <Button
                    onPress={this.submitMessage}
                    title={"Submit"}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.user,
        posts: state.posts
    })
};

const mapActionsToProps = {
    onSendMessage: sendMessage
}

export default connect(mapStateToProps, mapActionsToProps)(Comments);