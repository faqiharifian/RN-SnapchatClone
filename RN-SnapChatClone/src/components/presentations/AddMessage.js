import React, { Component } from 'react'
import { 
    TouchableOpacity, 
    View,
    Text,
    TextInput,
    Modal,
    Image,
    StyleSheet
} from 'react-native'
import configs from '../../configs'

class AddMessage extends Component{
    constructor() {
        super()
        this.state = {
            modalVisible: false,
            message: {
                for: '',
                content: ''
            }
        }
    }

    updateMessage(key, text) {
        let message = Object.assign({}, this.state.message)
        message[key] = text
        this.setState({
            message: message
        })
    }

    toggle() {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    submit() { 
        let message = {
            from: this.props.user.id,
            to: this.state.message.for,
            content: this.state.message.content
        }
        fetch(configs.url.message.post, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    modalVisible: false
                })
                if (responseJson.success) {
                    alert(responseJson.message)
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
            <View>
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { }}>
                    <View style={styles.modal}>
                        <View style={styles.newMessage}>
                            <Text style={styles.modalTitle}>New Message</Text>
                            <Text>For</Text>
                            <TextInput onChangeText={(text) => this.updateMessage('for', text)} />
                            <Text>Content</Text>
                            <TextInput onChangeText={(text) => this.updateMessage('content', text)} />
                            <TouchableOpacity
                                onPress={() => this.submit()}
                                style={styles.buttonModal}>
                                <Text>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    onPress={() => this.toggle()}    
                    style={styles.circle}>
                    <Image source={configs.images.add} style={styles.image}/>
                </TouchableOpacity>
            </View>    
        )
    }
}

const styles = StyleSheet.create({
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgb(98,195,112)',
        position: 'absolute',
        bottom: 10,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '80%',
        height: '80%'
    },
    modal: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.75)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    newMessage: {
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

export default AddMessage