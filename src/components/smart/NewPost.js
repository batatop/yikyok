import React from "react"
import { makePost } from '../../actions/authActions';
import { TextInput, Image, Dimensions, Text } from "react-native"
import { connect } from 'react-redux'
import glamorous from 'glamorous-native'

import { secondary, lightText, noteText, secondaryDark, appBackground, headerSelected } from "../../assets/styles/colors";
import { noteFontSize, inputBorderWidth, inputBorderRadius, inputPaddingSides, newPostSubmitFontSize, newPostSubmitSize, newPostSubmitBottomPadding, noteTopMargin } from "../../assets/styles/sizes";

class NewPost extends React.Component {
    static navigationOptions = ({ screenProps, navigation }) => ({
        title: "Add Post",
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
            <NewPostView>
                <TextAreaText>Title</TextAreaText>
                <TextAreaView>
                    <TextInput
                        onChangeText={(title) => this.setState({ title })}
                        value={this.state.title}
                    />
                </TextAreaView>
                <TextAreaText>Content</TextAreaText>
                <TextAreaView>
                    <TextInput
                        onChangeText={(content) => this.setState({ content })}
                        value={this.state.content}
                        multiline={true}
                    />
                </TextAreaView>
                <SubmitButton
                    onPress={this.submitPost}
                    underlayColor={secondaryDark}
                >
                    <SubmitButtonText>Submit  </SubmitButtonText>
                </SubmitButton>
            </NewPostView>
        );
    }
}

const IconContainerView = glamorous.view({
    flexDirection: "row",
    flex: 1,
})

const NewPostView = glamorous.view({
    flex: 1,
    backgroundColor: appBackground
})

const HeaderIconButton = glamorous.touchableHighlight({
    padding: 18
})

const TextAreaText = glamorous.text({
    color: noteText,
    fontSize: noteFontSize,
    paddingLeft: inputPaddingSides,
    paddingRight: inputPaddingSides,
    marginTop: noteTopMargin,
})

const TextAreaView = glamorous.view({
    borderWidth: inputBorderWidth,
    borderColor: secondary,
    borderRadius: inputBorderRadius,
    width: Dimensions.get("window").width - (2 * inputPaddingSides),
    marginLeft: inputPaddingSides
})

const SubmitButton = glamorous.touchableHighlight({
    backgroundColor: secondary,
    width: Dimensions.get("window").width - (2 * inputPaddingSides),
    height: newPostSubmitSize,
    borderWidth: inputBorderWidth,
    borderColor: secondary,
    borderRadius: inputBorderWidth,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: newPostSubmitBottomPadding,
    left: inputPaddingSides
})

const SubmitButtonText = glamorous.text({
    color: lightText,
    fontSize: newPostSubmitFontSize,
    fontWeight: 'bold'
})

const mapStateToProps = (state) => {
    return ({
        user: state.user
    })
};

const mapActionsToProps = {
    onMakePost: makePost
}

export default connect(mapStateToProps, mapActionsToProps)(NewPost);