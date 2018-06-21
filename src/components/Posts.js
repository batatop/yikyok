import React from "react"
import { View, Text, TouchableHighlight, Button } from "react-native"
import { signOut } from '../actions/authActions';
import { connect } from 'react-redux'

function renderPosts(posts) {
    let array = []
    for (let key in posts) {
        if (posts.hasOwnProperty(key)) {
            array.push(posts[key])
        }
    }
    return array

}

class Posts extends React.Component {
    constructor(props) {
        super(props)

        this.onSignOutPressed = this.onSignOutPressed.bind(this)
        this.onNewPost = this.onNewPost.bind(this)
        this.openPost = this.openPost.bind(this)
    }

    onNewPost() {
        this.props.navigation.navigate("NewPost")
    }

    openPost(postObj) {
        this.props.navigation.navigate("Comments", { postObj })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user != null) {
            this.props.screenProps.rootNavigation.navigate("PostNavigator")
        }
        else {
            this.props.screenProps.rootNavigation.navigate("Login")
        }
    }

    onSignOutPressed() {
        this.props.onSignOut(this.props.user.uid)
    }

    render() {
        return (
            <View>
                <Text>Posts{"\n"}</Text>
                <TouchableHighlight onPress={this.onSignOutPressed}><Text>Sign Out</Text></TouchableHighlight>
                <View>
                    {
                        renderPosts(this.props.posts).map((post, i) => {
                            return (
                                <TouchableHighlight key={`post_${i}`} onPress={() => this.openPost(post)}>
                                    <View>
                                        <Text>{post.title}</Text>
                                        <Text>{post.content}</Text>
                                        <Text>{post.timestamp}{"\n"}</Text>
                                    </View>
                                </TouchableHighlight>
                            )
                        })
                    }
                    <Button
                        onPress={this.onNewPost}
                        title={"Newpost"}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.user,
        posts: state.posts
    })
};

const mapActionsToProps = {
    onSignOut: signOut
}

export default connect(mapStateToProps, mapActionsToProps)(Posts);