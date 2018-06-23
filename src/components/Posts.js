import React from "react"
import { View, Dimensions, Image, ScrollView } from "react-native"
import { connect } from 'react-redux'
import glamorous from 'glamorous-native'

import { appBackground, secondary, secondaryDark, darkText, divider, postPressed, lightText } from "../assets/styles/colors"
import { newPostButtonSize, newPostButtonPadding, postFontSize, postPadding, postMinHeight, postBorderWidth } from "../assets/styles/sizes";

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
    static navigationOptions = ({ screenProps, navigation }) => ({
        title: "Posts",
        headerStyle: {
            backgroundColor: secondary
        },
        headerTitleStyle: {
            width: Dimensions.get('window').width,
            color: lightText
        },
        headerRight: (
            <IconContainerView>
                <HeaderIconButton
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Image source={require("../assets/icons/profileIcon.png")} />
                </HeaderIconButton>
            </IconContainerView>
        )
    });

    constructor(props) {
        super(props)
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

    render() {
        return (
            <PostsView>
                <ScrollView>
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
                    <ButtonEmptyView>

                    </ButtonEmptyView>
                </ScrollView>
                <NewPostButton
                    onPress={() => this.onNewPost()}
                    underlayColor={secondaryDark}
                >
                    <Image
                        source={require('../assets/icons/addPostIcon.png')}
                    />
                </NewPostButton>
            </PostsView>
        );
    }
}

const ButtonEmptyView = glamorous.view({
    height: newPostButtonSize + (2 * newPostButtonPadding)
})

const ContentText = glamorous.text({
    color: darkText,
    fontSize: postFontSize,
    paddingLeft: postPadding,
    paddingRight: postPadding
})

const IconContainerView = glamorous.view({
    flexDirection: "row",
    flex: 1,
})

const HeaderIconButton = glamorous.touchableHighlight({
    padding: 18
})

const NewPostButton = glamorous.touchableHighlight({
    position: 'absolute',
    bottom: newPostButtonPadding,
    right: newPostButtonPadding,
    backgroundColor: secondary,
    height: newPostButtonSize,
    width: newPostButtonSize,
    borderRadius: Dimensions.get("window").width,
    justifyContent: 'center',
    alignItems: 'center'
})

const PostButton = glamorous.touchableHighlight({
    minHeight: postMinHeight,
    borderBottomWidth: postBorderWidth,
    borderBottomColor: divider,
})

const PostContentView = glamorous.view({
    justifyContent: 'center'
})

const PostIndicatorView = glamorous.view({
    backgroundColor: secondary,
    height: "90%",
    width: 5
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

export default connect(mapStateToProps)(Posts);