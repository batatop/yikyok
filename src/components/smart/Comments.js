import React from "react"
import { sendMessage } from '../../actions/authActions';
import { Text, Dimensions, Image, ScrollView, View, TouchableHighlight } from "react-native"
import { connect } from 'react-redux'
import glamorous from 'glamorous-native'

import { secondary, lightText, darkText, divider, appBackground, secondaryDark, secondaryLight, headerSelected, noteText, primaryLight } from "../../assets/styles/colors";
import { postFontSize, postPadding, postMinHeight, postBorderWidth, singleCommentHeight, sendIconSize, sendIconBorderSize, postIndicatorWidth, singleCommentIndicatorWidth, commentsTextPaddingTop, contentsPaddingSides, inputHeight, iconPadding, commentsInputPaddingSides, inputTextboxBorderRadius, inputTextboxHeight, sendIconPadding, noteFontSize } from "../../assets/styles/sizes";

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

class Comments extends React.Component {
    static navigationOptions = ({ screenProps, navigation }) => ({
        title: "Post",
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
        this.state = {
            message: ''
        }
        this.listMessages = this.listMessages.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
        this.vote = this.vote.bind(this)
    }

    listMessages(posts, postId) {
        return renderMessages(posts, postId).map((obj, i) =>
            <SingleCommentView key={`comment_${i}`}>
                <SingleCommentIndicatorView />
                <SingleCommentContentView>
                    <SingleCommentText>{obj.comment}</SingleCommentText>
                    <DateText>{dateConvert(obj.timestamp)}</DateText>
                </SingleCommentContentView>
            </SingleCommentView>
        )
    }

    submitMessage() {
        this.props.onSendMessage(this.props.user.uid, this.props.navigation.state.params.postObj.postId, this.state.message)
    }

    vote(num) {
        // let pid = this.props.navigation.state.params.postObj.postId
        // let upvoted
        // if (this.props.user.votes && this.props.user.votes[pid])
        //     upvoted = this.props.user.votes[pid].vote

        // let voteState = 0

        // if (upvoted != undefined) {
        //     if (!(upvoted === num)) {
        //         voteState = num
        //     }
        // }

        // this.props.onVote(this.props.navigation.state.params.postObj.postId, this.props.user.uid, voteState)
    }
    
    render() {
        let mark = this.props.navigation.state.params.postObj
        return (
            <CommentsView>
                <ScrollView>
                    <PostView>
                        <PostIndicatorView />
                        <PostContentView>
                            <TitleText>{mark.title}</TitleText>
                            <ContentText>{mark.content}</ContentText>
                            <FooterView>
                                <VoteButton
                                    onPress={() => this.vote(1)}
                                    underlayColor={headerSelected}
                                >
                                    <VoteImage source={require("../../assets/icons/upIcon.png")} />
                                </VoteButton>
                                <DateText>{dateConvert(mark.timestamp)}</DateText>
                            </FooterView>
                        </PostContentView>
                    </PostView>
                    <CommentsTextView>
                        <Text>Comments</Text>
                    </CommentsTextView>
                    { this.listMessages(this.props.posts, mark.postId) }
                </ScrollView>
                <InputView>
                    <TextboxSide>
                        <TextboxArea>
                            <TextboxInput
                                placeholder="Type a comment"
                                onChangeText={(message) => this.setState({ message })}
                            />
                        </TextboxArea>
                    </TextboxSide>
                    <InputIconSide>
                        <SendButton
                            onPress={this.submitMessage}
                            underlayColor={secondaryDark}
                        >
                            <SendIcon source={require("../../assets/icons/sendIcon.png")} />
                        </SendButton>
                    </InputIconSide>
                </InputView>
            </CommentsView>
        )
    }
}

const CommentsView = glamorous.view({
    flex: 1,
    backgroundColor: appBackground
})

const CommentsTextView = glamorous.view({
    paddingTop: commentsTextPaddingTop,
    paddingLeft: contentsPaddingSides,
    paddingRight: contentsPaddingSides,
    borderBottomWidth: postBorderWidth,
    borderBottomColor: divider,
})

const ContentText = glamorous.text({
    color: darkText,
    fontSize: postFontSize,
    paddingLeft: contentsPaddingSides,
    paddingRight: contentsPaddingSides
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

const InputIconSide = glamorous.view({
    flex: 0.15,
    height: inputHeight,
    justifyContent: "center",
    alignItems: "center",
})

const InputView = glamorous.view({
    flexDirection: "row",
    height: inputHeight,
})

const HeaderIconButton = glamorous.touchableHighlight({
    padding: iconPadding
})

const PostView = glamorous.view({
    flexDirection: 'row',
    alignItems: 'center',
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
    width: postIndicatorWidth
})

const SendButton = glamorous.touchableHighlight({
    height: sendIconSize,
    width: sendIconSize,
    borderRadius: sendIconBorderSize,
    backgroundColor: secondary,
    justifyContent: "center",
    alignItems: "center",
    padding: sendIconPadding
})

const SendIcon = glamorous.image({
    width: sendIconSize,
    height: sendIconSize
})

const SingleCommentView = glamorous.view({
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: singleCommentHeight,
    borderBottomWidth: postBorderWidth,
    borderBottomColor: divider,
})

const SingleCommentContentView = glamorous.view({
    justifyContent: 'center',
    width: Dimensions.get('window').width
})

const SingleCommentIndicatorView = glamorous.view({
    backgroundColor: secondaryLight,
    height: "90%",
    width: singleCommentIndicatorWidth
})

const SingleCommentText = glamorous.text({
    color: darkText,
    fontSize: postFontSize,
    paddingLeft: postPadding,
    paddingRight: postPadding
})

const TitleText = glamorous.text({
    color: darkText,
    fontWeight: 'bold',
    fontSize: postFontSize,
    paddingLeft: contentsPaddingSides,
    paddingRight: contentsPaddingSides
})

const TextboxArea = glamorous.view({
    height: inputTextboxHeight,
    backgroundColor: "white",
    borderRadius: inputTextboxBorderRadius,
    marginLeft: commentsInputPaddingSides,
    marginRight: commentsInputPaddingSides
})

const TextboxInput = glamorous.textInput({
    height: inputTextboxHeight,
    marginLeft: commentsInputPaddingSides,
    marginRight: commentsInputPaddingSides
})

const TextboxSide = glamorous.view({
    flex: 0.85,
    height: inputHeight,
    justifyContent: "center",
})

const VoteButton = glamorous.touchableHighlight({
    paddingLeft: contentsPaddingSides
})

const VoteImage = glamorous.image({
    tintColor: primaryLight
})

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