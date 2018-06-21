import React from "react"
import { View, Text, TouchableHighlight, Dimensions, Image } from "react-native"
import { signOut } from '../actions/authActions';
import { connect } from 'react-redux'
import glamorous from 'glamorous-native'

import { appBackground, secondary, secondaryDark, darkText, divider, postPressed } from "../assets/styles/colors"

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
            <PostsView>
                <View>
                    {
                        renderPosts(this.props.posts).map((post, i) => {
                            return (
                                <PostButton
                                    key={`post_${i}`}
                                    onPress={() => this.openPost(post)}
                                    underlayColor={postPressed}
                                >
                                    <PostView>
                                        <PostIndicatorView/>
                                        <PostContentView>
                                            <TitleText>{post.title} </TitleText>
                                            <ContentText>{post.content}</ContentText>
                                            {/* <Text>{post.timestamp}{"\n"}</Text> */}
                                        </PostContentView>
                                    </PostView>
                                </PostButton>
                            )
                        })
                    }
                </View>
                <NewPostButton
                    onPress={() => this.onNewPost()}
                    underlayColor= {secondaryDark}
                >
                    <Image
                        source={require('../assets/icons/addPostIcon.png')}
                    />
                </NewPostButton>
                <TouchableHighlight onPress={this.onSignOutPressed}><Text>Sign Out</Text></TouchableHighlight>
            </PostsView>
        );
    }
}

const ContentText = glamorous.text({
    color: darkText,
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 20
})

const NewPostButton = glamorous.touchableHighlight({
    position: 'absolute',
    bottom: 35,
    right: 35,
    backgroundColor: secondary,
    height: 75,
    width: 75,
    borderRadius: Dimensions.get("window").width,
    justifyContent: 'center',
    alignItems: 'center'
})

const PostButton = glamorous.touchableHighlight({
    minHeight: 80,
    borderBottomWidth: 1,
    borderBottomColor: divider,
})

const PostContentView = glamorous.view({
    justifyContent: 'center'
})

const PostIndicatorView = glamorous.view({
    backgroundColor: secondary,
    height: "90%",
    width: 10
})

const PostView = glamorous.view({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
})

const PostsView = glamorous.view({
    flex: 1,
    flexDirection: 'column',
    backgroundColor: appBackground
})

const TitleText = glamorous.text({
    color: darkText,
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 20
})

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