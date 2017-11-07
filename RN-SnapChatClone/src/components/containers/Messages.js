import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Button
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
            },
            user: null
        }
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

    submit() { 
        fetch(configs.url.auth.post, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.login)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                alert(JSON.stringify(responseJson))
                if (responseJson.success) {
                    this.setState({
                        user: responseJson.data
                    })
                    fetch(configs.url.message.get + "?id=" + this.state.user.id)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                messages: responseJson.data,
                                modalVisible: false
                            })
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                } else {
                    alert(responseJson.message)
                }    
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
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}>
                    <View style={styles.modal}>
                        <View style={styles.login}>
                            <Text style={styles.modalTitle}>Login / Sign Up</Text>    
                            <Text>Username</Text>    
                            <TextInput onChangeText={(text) => this.updateLogin('username', text)}/>    
                            <Text>Password</Text>
                            <TextInput onChangeText={(text) => this.updateLogin('password', text)} />    
                            <TouchableOpacity
                                onPress={() => this.submit()}    
                                style={styles.buttonModal}>
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
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
    },
    modalTitle: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 14
    },
    buttonModal: {
        alignSelf: 'flex-end'
    }
})

export default Messages