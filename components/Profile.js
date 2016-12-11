import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sex: '',
            birthday: '',
            phone: ''
        };
    }

    update() {
        const {name, sex, birthday, phone} = this.state;
        const user = {
            id: this.props.user.profile.id,
            name: name,
            sex: sex,
            birthday: birthday,
            emergency_call: {phone: phone}
        };
        this.props.updateProfile(user, this.props.user.profile.token);
    }

    handleInput(value, type) {
        switch(type){
            case 'name':
                this.setState({ name: value });
                break;
            case 'sex':
                this.setState({ sex: value });
                break;
            case 'birthday':
                this.setState({ birthday: value });
                break;
            case 'phone':
                this.setState({ phone: value });
                break;
            default:
                break;
        }
    }

    uploadImage() {
        var options = {title: 'Select an image'};
        var onImageUpload = this.props.onImageUpload.bind(this);
        ImagePicker.showImagePicker(options, (response)=> {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                var source;
                if (Platform.OS === 'ios') {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                } else {
                    source = {uri: response.uri, isStatic: true};
                }
                onImageUpload(source);
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./../public/img/background_1.png')} style={styles.backgroundImage}>
                    <View style={styles.mask}>
                        <KeyboardAvoidingView behavior={'position'}>
                            <TouchableOpacity style={[styles.circle, styles.shadow]}
                                              onPress={this.uploadImage.bind(this)}>
                                {this.props.user.profile.avatar ?
                                    <Image style={styles.avatar} source={this.props.user.profile.avatar.uri}/>
                                    :
                                    <Image style={styles.avatar} source={require('./../public/img/avatar.png')}/>
                                }

                            </TouchableOpacity>
                            <View style={styles.form}>
                                <View style={styles.bar}>
                                    <TouchableOpacity style={[styles.save, styles.shadow]}
                                                      onPress={() => this.update()}>
                                        <Text style={styles.saveText}>保  存</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.profile}>
                                    <View style={[styles.profileInput]}>
                                        <Text style={styles.saveText}>用  户  名</Text>
                                        <TextInput style={styles.input}
                                                   onChangeText={(value) => {this.handleInput(value, 'name')}}>
                                        </TextInput>
                                    </View>
                                    <View style={[styles.profileInput]}>
                                        <Text style={styles.saveText}>性        别</Text>
                                        <TextInput style={styles.input}
                                                   onChangeText={(value) => {this.handleInput(value, 'sex')}}>
                                        </TextInput>
                                    </View>
                                    <View style={[styles.profileInput]}>
                                        <Text style={styles.saveText}>出生年月</Text>
                                        <TextInput style={styles.input} placeholder='  1988/01/01' placeholderTextColor='white'
                                                   onChangeText={(value) => {this.handleInput(value, 'birthday')}}>
                                        </TextInput>
                                    </View>
                                    <View style={[styles.profileInput]}>
                                        <Text style={styles.saveText}>紧急电话</Text>
                                        <TextInput style={styles.input}
                                                   onChangeText={(value) => {this.handleInput(value, 'phone')}}>
                                        </TextInput>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => Actions.incidentListContainer()}>
                                <Text style={[styles.tabText, styles.shadow]}>Incidents</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
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
        width: width,
        height: height
    },
    mask: {
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.2)',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    form: {
        width: width/1.2,
        height: height/2.2,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 8
    },
    bar: {
        position: 'absolute',
        width: width/1.2,
        height: 45,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.6)'
    },
    save: {
        alignSelf: 'center',
        width: 80,
        height: 30,
        position: 'absolute',
        marginTop: 8,
        marginLeft: width/1.8,
        backgroundColor: '#DF647A',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profile: {
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 80,
        marginLeft: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileInput: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
        alignSelf: 'center'
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
        marginTop: height / 12,
        marginBottom: 40,
        width: 130,
        height: 130,
        borderRadius: 130 / 2,
        backgroundColor: 'white',

        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 100,
        height: 100
    },
    size: {
        width: width / 1.5,
        height: 40
    },
    input: {
        width: width / 2,
        height: 30,
        marginTop: 10,
        marginLeft: 5,
        backgroundColor: 'rgba(255,255,255,0.4)',
        color: '#53585F'
    },
    saveText: {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 14
    },
    tabText: {
        alignSelf: 'center',
        top: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 30,
        lineHeight: 30
    }
});


export default Profile;

