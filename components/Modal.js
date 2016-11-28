import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {content, toggleErrorModal} = this.props.config;
        return (
            <View style={styles.container}>
                <View style={styles.mask}>
                    <View style={styles.box}>
                        <View style={[styles.msg]}>
                            <View style={[styles.circle_1]}>
                                <View style={[styles.circle_2]}>
                                    <Text style={{color: '#DF647A'}}>!</Text>
                                </View>
                            </View>
                            <Text style={styles.text}>{content}</Text>
                        </View>
                        <TouchableOpacity style={[styles.loginput, styles.size, styles.shadow, styles.button]}
                                          onPress={() => toggleErrorModal()}>
                            <Text style={[styles.text, {color: 'white'}]}>确       定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width:width,
        height:height
    },
    mask: {
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0, 0.5)'
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowOpacity: 0.3
    },
    box: {
        alignSelf: 'center',
        marginTop: height / 3,
        width: width/1.2,
        height: 180,
        borderRadius: 12,
        backgroundColor: 'white',

        alignItems:'center',
        justifyContent:'center'
    },
    size: {
        width: width / 1.5,
        height: 40
    },
    msg: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
        position: 'relative',
        alignSelf: 'center'
    },
    circle_1: {
        marginTop: 6,
        marginRight: 6,
        width: 26,
        height: 26,
        borderRadius: 26 / 2,
        backgroundColor: '#DF647A',

        alignItems:'center',
        justifyContent:'center'
    },
    circle_2: {
        position: 'absolute',
        top: 2,
        left: 2,
        alignSelf: 'center',
        width: 22,
        height: 22,
        borderRadius: 22 / 2,
        backgroundColor: 'white',

        alignItems:'center',
        justifyContent:'center'
    },
    text: {
        alignSelf: 'center',
        width: width / 2,
        height: 40,
        textAlign: 'center',
        color: 'black',
        lineHeight: 32,
        fontSize: 20
    },
    loginput: {
        alignSelf: 'center',
        width: width / 1.5,
        height: 40,
        borderRadius: 14,
        alignItems:'center',
        justifyContent:'center'
    },
    button: {
        marginTop: 40,
        backgroundColor: '#DF647A'
    }
});

export default Modal;

