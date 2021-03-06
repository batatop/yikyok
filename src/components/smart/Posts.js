import React from "react"
import { View, Dimensions, Image, ScrollView } from "react-native"
import { connect } from 'react-redux'
import glamorous from 'glamorous-native'

import { appBackground, secondary, secondaryDark, darkText, divider, postPressed, lightText, headerSelected, noteText, secondaryLight, primary } from "../../assets/styles/colors"
import { newPostButtonSize, newPostButtonPadding, postFontSize, postPadding, postMinHeight, postBorderWidth, postIndicatorWidth, contentsPaddingSides, noteFontSize } from "../../assets/styles/sizes";
import { votePost } from "../../actions/authActions";

function renderPosts(posts) {
    let array = []
    for (let key in posts) {
        if (posts.hasOwnProperty(key)) {
            array.push(posts[key])
        }
    }

    return array
}

function dateConvert(timestamp) {

    let days = Date.now() - timestamp
    let d = days / 86400000
    d = Math.floor(d)

    if (d <= 0) {
        //today
        if (days < 3600000) {
            if (days < 60000) {
                return `Less than a minute ago`
            }
            let minutes = Math.floor(days / 60000)
            return (`${minutes} minutes ago`)
        }
        //this hour
        else {
            return (`Today at ${new Date(timestamp).getHours()}:${new Date(timestamp).getMinutes()}`)
        }

    }
    else if (d === 1) {
        return (`Yesterday at ${new Date(timestamp).getHours()}:${new Date(timestamp).getMinutes()}`)
    }
    else {
        return (`${d} days ago at ${new Date(timestamp).getHours()}:${new Date(timestamp).getMinutes()}`)
    }

    // hour = 3600000
    // minute = 60000
}

class Posts extends React.Component {
    static navigationOptions = ({ screenProps, navigation }) => ({
        title: "Posts",
        headerStyle: {
            backgroundColor: secondary
        },
        headerTitleStyle: {
            width: Dimensions.get('window').width
        },
        headerTintColor: lightText,
        headerRight: (
            <IconContainerView>
                <HeaderIconButton
                    onPress={() => navigation.navigate("Profile")}
                    underlayColor={headerSelected}
                >
                    <Image source={require("../../assets/icons/profileIcon.png")} />
                </HeaderIconButton>
            </IconContainerView>
        )
    });

    constructor(props) {
        super(props)
        this.onNewPost = this.onNewPost.bind(this)
        this.openPost = this.openPost.bind(this)
        this.setVoteButtonColor = this.setVoteButtonColor.bind(this)
        this.vote = this.vote.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user != null) {
            this.props.screenProps.rootNavigation.navigate("PostNavigator")
        }
        else {
            this.props.screenProps.rootNavigation.navigate("Login")
        }
    }

    onNewPost() {
        this.props.navigation.navigate("NewPost")
    }

    openPost(postObj) {
        this.props.navigation.navigate("Comments", { postObj })
    }

    setVoteButtonColor(pid, reaction) {
        if (reaction == "like") {
            if (this.props.user && this.props.user.votes && this.props.user.votes[pid] && this.props.user.votes[pid].vote == 1) {
                return secondaryLight
            }
        }
        else if (reaction == "dislike") {
            if (this.props.user && this.props.user.votes && this.props.user.votes[pid] && this.props.user.votes[pid].vote == -1) {
                return secondaryLight
            }
        }

        return primary
    }

    vote(post, vote) {
        let pid = post.postId
        this.props.onVote(pid, this.props.user.uid, vote)
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
                                            <PostIndicatorView />
                                            <PostContentView>
                                                <TitleText>{post.title}</TitleText>
                                                <ContentText>{post.content}</ContentText>
                                                <FooterView>
                                                    <VoteView>
                                                        <VoteButton
                                                            onPress={() => this.vote(post, 1)}
                                                            underlayColor={postPressed}
                                                        >
                                                            <Image
                                                                source={require("../../assets/icons/upIcon.png")}
                                                                style={{
                                                                    tintColor: this.setVoteButtonColor(post.postId, "like")
                                                                }}
                                                            />
                                                        </VoteButton>
                                                        <VoteText>{post.vote}   </VoteText>
                                                        <VoteButton
                                                            onPress={() => this.vote(post, -1)}
                                                            underlayColor={postPressed}
                                                        >
                                                            <Image
                                                                source={require("../../assets/icons/downIcon.png")}
                                                                style={{
                                                                    tintColor: this.setVoteButtonColor(post.postId, "dislike")
                                                                }}
                                                            />
                                                        </VoteButton>
                                                    </VoteView>
                                                    <DateText>{dateConvert(post.timestamp)}</DateText>
                                                </FooterView>
                                            </PostContentView>
                                        </PostView>
                                    </PostButton>
                                )
                            })
                        }
                    </View>
                    <ButtonEmptyView/>
                </ScrollView>
                <NewPostButton
                    onPress={() => this.onNewPost()}
                    underlayColor={secondaryDark}
                >
                    <Image
                        source={require('../../assets/icons/addPostIcon.png')}
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

const DateText = glamorous.text({
    color: noteText,
    fontSize: noteFontSize,
    textAlign: 'right',
    paddingRight: postIndicatorWidth + contentsPaddingSides
})

const FooterView = glamorous.view({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    justifyContent: 'center',
    width: Dimensions.get('window').width
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

const VoteButton = glamorous.touchableHighlight({
    padding: contentsPaddingSides
})

const VoteText = glamorous.text({
    fontWeight: 'bold',
    paddingLeft: contentsPaddingSides
})

const VoteView = glamorous.view({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
})

const mapStateToProps = (state) => {
    return ({
        user: state.user,
        posts: state.posts
    })
}

const mapActionsToProps = {
    onVote: votePost
}

export default connect(mapStateToProps, mapActionsToProps)(Posts);