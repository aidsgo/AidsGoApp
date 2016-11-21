import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Platform
} from 'react-native'

import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
    }

    isTakenByMe(incident, userId) {
        return !!incident.taken.find(volunteerId => volunteerId === userId)
    }

    isResolved(incident) {
        return incident.resolved;
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
                onImageUpload(this.props.incident.id, source);
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.camera}>
                    <Icon style={{}} name='ios-camera-outline' size={45}/>
                </View>
                <View style={styles.imagesPanel}>
                    {
                        (this.props.incident.images || []).map((image) => {
                            return <Image source={image} style={styles.itemLayout}/>
                        })
                    }
                    <TouchableOpacity style={[styles.uploadBtn, styles.itemLayout]} onPress={this.uploadImage.bind(this)}>
                        <Icon style={{color: "#979797"}} name='ios-add' size={60}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn}
                                  onPress={() => {this.props.onIncidentResolve(this.props.incident.id, this.props.user.id);}}>
                    <Text style={styles.btnText}>Resolve</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: deviceWidth,
        backgroundColor: '#FFFFFF',
        paddingLeft: 10,
        paddingRight: 10,
    },
    camera: {
        position: 'absolute',
        top: -25,
        right: 25,
        alignItems: 'center',
        overflow: 'hidden',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        zIndex: 10
    },
    imagesPanel: {
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 2,
        paddingBottom: 2,
        marginTop: 50,
        marginBottom: 50,
        backgroundColor: '#ECEDEE',
        flexDirection: 'row',
        zIndex: 20,
        flexWrap: 'wrap'
    },
    itemLayout:  {
        marginLeft: 2,
        marginRight: 2,
        marginTop: 6,
        marginBottom: 6,
        width: (deviceWidth - 36) / 3,
        height: (deviceWidth - 36) / 3
    },
    uploadBtn: {
        borderWidth: 1,
        borderColor: '#979797',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        height: 42,
        backgroundColor: '#EE8380',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

module.exports = ImageUpload;