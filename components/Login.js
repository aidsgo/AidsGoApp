import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import {crypto} from 'react-native-crypto';

import Modal from './Modal'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorModal: false,
            phoneNumber: '',
            password: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.signedIn) {
            Actions.incidentListContainer();
        } else if (!nextProps.user.signedIn) {
            this.toggleErrorModal();
        }
    }

    toggleErrorModal() {
        this.setState({
            errorModal: !this.state.errorModal
        });
    }

    errorModal() {
        const config = {content: '用户名或密码不正确!', toggleErrorModal: () => this.toggleErrorModal()};
        return <Modal config={config}/>
    }

    login() {
        const {phoneNumber, password} = this.state;
        const psw= crypto.createHash('md5').update(password).digest('hex');
        console.log('psw', psw);
        this.props.userSignUp(phoneNumber, psw);
    }

    handlePhone(value) {
        this.setState({
            phoneNumber: value
        });
    }

    handlePassword(value) {
        this.setState({
            password: value
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./../public/img/background_1.png')} style={styles.backgroundImage}>
                    <View style={styles.mask}>
                        <View style={[styles.circle, styles.shadow]}>
                            <Image style={styles.avatar} source={require('./../public/img/avatar.png')}/>
                        </View>
                        <View style={[styles.loginput, styles.size, styles.shadow, styles.username]}>
                            <Image source={require('./../public/img/user.png')} style={styles.icon}/>
                            <View style={styles.upright}/>
                            <TextInput style={styles.input} placeholder='  电    话' placeholderTextColor='white'
                                       onChangeText ={(value) => {this.handlePhone(value)}}>

                            </TextInput>
                        </View>
                        <View style={[styles.loginput, styles.size, styles.shadow, styles.password]}>
                            <Image source={require('./../public/img/lock.png')} style={styles.icon}/>
                            <View style={styles.upright}/>
                            <TextInput style={styles.input} placeholder='  密    码' placeholderTextColor='white'
                                       onChangeText ={(value) => {this.handlePassword(value)}}>

                            </TextInput>
                        </View>
                        <TouchableOpacity style={[styles.loginput, styles.size, styles.shadow, styles.button]}
                                          onPress={() => this.login()}>
                            <Text style={styles.loginText}>登       录</Text>
                        </TouchableOpacity>
                        <View style={styles.forget}>
                            <Text style={styles.tabText}>忘记密码?</Text>
                        </View>
                        {this.state.errorModal ? this.errorModal() : null}
                    </View>
                </Image>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {},
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width:width,
        height:height
    },
    mask: {
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowOpacity: 0.3
    },
    circle: {
        alignSelf: 'center',
        marginTop: height / 5,
        width: 130,
        height: 130,
        borderRadius: 130 / 2,
        backgroundColor: 'white',

        alignItems:'center',
        justifyContent:'center'
    },
    avatar: {
        width: 100,
        height: 100
    },
    size: {
        width: width / 1.5,
        height: 40
    },
    loginput: {
        alignSelf: 'center',
        width: width / 1.5,
        height: 40,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    username: {
        marginTop: height / 6
    },
    password: {
        marginTop: 10
    },
    icon: {
        position: 'absolute',
        top: 8,
        left: 10,
        resizeMode: 'stretch',
        width: 24,
        height: 24
    },
    upright: {
        position: 'absolute',
        top: 8,
        left: 40,
        width: 2,
        height: 24,
        borderLeftColor: 'white',
        borderLeftWidth: 1
    },
    input: {
        position: 'absolute',
        right: 12,
        width: width / 2,
        height: 30,
        marginTop: 5,
        backgroundColor: 'rgba(255,255,255,0.4)',
        color: '#53585F'
    },
    button: {
        marginTop: 30,
        backgroundColor: '#DF647A'
    },
    forget: {
        width: width / 3,
        height: 40,
        alignSelf: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: 1

    },
    loginText: {
        alignSelf: 'center',
        width: width / 3,
        height: 40,
        textAlign: 'center',
        color: 'white',
        lineHeight: 32,
        fontSize: 20
    },
    tabText: {
        textAlign: 'center',
        color: 'white',
        lineHeight: 34
    },
    placeholderTextColor: {
        color: 'white'
    }
});

export default Login;

