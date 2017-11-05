import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

class Messages extends Component {

    constructor() {
        super()
        this.state = {
            messages: [
                { id: 1, from: 'Mom', content: 'How are you?' },
                { id: 2, from: 'Dad', content: 'Hello Ryan' },
                { id: 3, from: 'Brother', content: 'Let\'s play' },
                { id: 4, from: 'Sister', content: 'Pick me up at 4pm' },
                { id: 5, from: 'Cat', content: 'Meow meow' },
            ]
        }
    }

    _renderMessage(item) {
        return (
            <View style={styles.message}>
                <View style={styles.messageContent}>
                    <Text style={styles.messageText}>From: {item.from}</Text>
                    <Text style={styles.messageText}>{item.content}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={this.state.messages}
                renderItem={({ item }) => this._renderMessage(item)}
            />
        )
    }
}

const styles = StyleSheet.create({
    main: {
    },
    message: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'rgb(71,77,89)'
    },
    messageContent: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    messageText: {
        color: 'rgb(12,0,51)',
        fontFamily: 'helvetica'
    },
})

export default Messages