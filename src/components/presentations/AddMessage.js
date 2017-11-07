import React, { Component } from 'react'
import { 
    TouchableOpacity, 
    Image,
    StyleSheet
} from 'react-native'
import configs from '../../configs'

class AddMessage extends Component{
    render() { 
        return (
            <TouchableOpacity
                onPress={this.props.addMessage}    
                style={styles.circle}>
                <Image source={configs.images.add} style={styles.image}/>
            </TouchableOpacity>
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
    }
})

export default AddMessage