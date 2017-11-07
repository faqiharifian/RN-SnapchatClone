import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal
} from 'react-native'
import { AddMessage } from '../presentations'
import configs from '../../configs'

class Messages extends Component {

    constructor() {
        super()
        this.state = {
            messages: [
            ],
            modalVisible: true,
            login: {
                username: '',
                password: ''
            }
        }
    }

    addMessage() {
        alert('Message Added')
    }

    _renderMessage(item) {
        return (
            <View style={styles.message}>
                <View style={styles.messageContent}>
                    <Text style={styles.messageText}>From: {item.sender}</Text>
                    <Text style={styles.messageText}>{item.content}</Text>
                </View>
            </View>
        )
    }

    updateLogin(key, text) {
        let newLogin = Object.assign({}, this.state.login)
        newLogin[key] = text
        this.setState({
            login: newLogin
        })
    }

    componentDidMount() {
        fetch(configs.url.message.get)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    messages: responseJson.data
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    render() {
        return (
            <View style={styles.main}>
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}>
                    <View style={styles.modal}>
                        <View style={styles.login}>
                            <Text>Login / Sign Up</Text>    
                            <Text>Username</Text>    
                            <TextInput onChangeText={(text) => this.updateLogin('username', text)}/>    
                            <Text>Password</Text>
                            <TextInput onChangeText={(text) => this.updateLogin('password', text)} />    
                            <TouchableOpacity>
                                <Text>Submit</Text>
                            </TouchableOpacity>    
                        </View>    
                    </View>
                </Modal>    
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={this.state.messages}
                    renderItem={({ item }) => this._renderMessage(item)}
                    />
                <AddMessage addMessage={() => this.addMessage()}/>
            </View>    
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
        height: '100%'
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
    modal: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.75)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    login: {
        width: '90%',
        height: '30%',
        backgroundColor: 'rgb(255,255,255)',
    }
})

export default Messages