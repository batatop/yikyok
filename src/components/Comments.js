import React from "react"
import { sendMessage } from '../actions/authActions';
import { View, Text, TextInput, Button } from "react-native"
import { connect } from 'react-redux'

function renderMessages(posts, postId) {
    let array = []
    let post = posts[postId]
    
    if(postId != undefined) {
        if(post.comments) {
            for (let key in post.comments) {
                if (post.comments.hasOwnProperty(key)) {
                    array.push(post.comments[key])
                }
            }
        }
    }
    return array
}

class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.submitMessage = this.submitMessage.bind(this)
    }

    submitMessage() {
        this.props.onSendMessage(this.props.user.uid, this.props.navigation.state.params.postObj.postId, this.state.message)
    }
    
    render() {
        let mark = this.props.navigation.state.params.postObj
        return (
            <View>
                <TextInput onChangeText={(message) => this.setState({ message })}></TextInput>
                <Button
                    onPress={this.submitMessage}
                    title={"Submit"}
                />
                <Text>{mark.title}{"\n"}</Text>
                <Text>{mark.content}{"\n"}</Text>
                {
                    renderMessages(this.props.posts, mark.postId).map((obj,i) =>
                        <View key={`comment_${i}`}>
                            <Text>{obj.comment}{"\n"}</Text>
                        </View>
                    )
                }
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