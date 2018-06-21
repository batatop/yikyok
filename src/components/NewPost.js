import React from "react"
import { makePost } from '../actions/authActions';
import { View, Text, TextInput, Button } from "react-native"
import { connect } from 'react-redux'

class NewPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: ''
        }
        this.submitPost = this.submitPost.bind(this)
    }

    submitPost() {
        this.props.onMakePost({
            title: this.state.title,
            content: this.state.content
        })
        this.props.navigation.navigate("Posts")
    }

    render() {
        return (
            <View>
                <Text>NewPost</Text>
                <View>
                    <TextInput onChangeText={(title) => this.setState({ title })}></TextInput>
                    <TextInput onChangeText={(content) => this.setState({ content })}></TextInput>
                    <Button
                        onPress={this.submitPost}
                        title={"Submit"}
                    />
                </View>
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
    onMakePost: makePost
}

export default connect(mapStateToProps, mapActionsToProps)(NewPost);