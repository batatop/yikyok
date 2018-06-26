import glamorous from 'glamorous-native'
import { appTitle, secondaryLight } from '../../assets/styles/colors'
import React from 'react'
import { Animated } from 'react-native'

const AnimatedView = glamorous(Animated.View)

export default class FadeInView extends React.Component {
    // Animation
    state = {
        fade: new Animated.Value(1),  // Initial value for opacity: 0
    }
    // componentWillUnmount() {
    //     Animated.timing(
    //         this.state.fade,
    //         {
    //             toValue: 0,
    //             duration: 1000,
    //         }
    //     ).start();
    // }

    render() {
        return (
            <LoadingView style={{ opacity: this.state.fade}}>
                <LoadingText>New Yikyak  </LoadingText>
            </LoadingView>
        );
    }
}

const LoadingText = glamorous.text({
    color: appTitle,
    fontSize: 60,
    fontWeight: 'bold'
})

const LoadingView = AnimatedView({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: secondaryLight
})

// You can then use your `FadeInView` in place of a `View` in your components:
// export default class App extends React.Component {
//     render() {
//         return (
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                 <FadeInView style={{ width: 250, height: 50, backgroundColor: 'powderblue' }}>
//                     <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>Fading in</Text>
//                 </FadeInView>
//             </View>
//         )
//     }
// }


// class Loading extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             fade: new Animated.Value(0)  // Initial value for opacity: 0
//         }

//         this.animate = this.animate.bind(this)
//     }

//     componentWillUnmount() {
//         this.animate()
//     }

//     animate() {
//         Animated.timing(
//             // Animate value over time
//             this.state.fade, // The value to drive
//             {
//                 toValue: 1, // Animate to final value of 1
//                 duration: 1000
//             }
//         ).start()
//     }

//     render() {
//         return (
//             <Animated.LoadingView>
//                 <LoadingText>New Yikyak  </LoadingText>
//             </Animated.LoadingView>
//         );
//     }
// }

// const LoadingText = glamorous.text({
//     color: appTitle,
//     fontSize: 65,
//     fontWeight: 'bold'
// })

// const LoadingView = glamorous.view({
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: secondaryLight
// })

// export default Loading;