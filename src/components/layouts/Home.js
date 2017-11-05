import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { Header } from '../presentations'
import { Messages } from '../containers'

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header text={"ALL Messages"} />
                <Messages />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F5FCFF',
    }
});

export default Home