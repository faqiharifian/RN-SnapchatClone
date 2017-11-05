import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar
} from 'react-native'

class Header extends Component {
    render() {
        return (
            <View style={styles.topNav}>
                <StatusBar barStyle="light-content" />
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topNav: {
        backgroundColor: "rgb(21,0,51)",
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        width: '100%'
    },
    text: {
        color: 'rgb(255,255,255)',
        fontFamily: 'helvetica',
        alignSelf: 'center',
        fontSize: 14
    }
})

export default Header