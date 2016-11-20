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

class ActionButton extends Component {
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

    image() {
        return (
            <View style={styles.images}>
                {
                    this.props.incident.images.map((image) => {
                        return <Image source={image} style={styles.image}/>
                    })
                }
            </View>
        );
    }

    showUploadButton() {
        if (this.props.incident.taken && !this.props.incident.resolved) {
            return (
                <View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity style={styles.uploadBtn} onPress={this.uploadImage.bind(this)}>
                        <Icon style={{color: 'white'}} name={'ios-camera'} size={25}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    showImage() {
        if (this.props.incident.taken) {
            return (
                <View>
                    {this.image()}
                    {this.showUploadButton()}
                </View>
            )
        }
    }

    render() {
        if (this.isTakenByMe(this.props.incident, this.props.user.id) && !this.isResolved(this.props.incident)) {
            return (
                <TouchableOpacity style={styles.btn}
                                  onPress={() => {this.props.onIncidentResolve(this.props.incident.id, this.props.user.id);}}>
                    <Text style={styles.btnText}>Resolve</Text>
                </TouchableOpacity>
            )
        } else if (!this.isTakenByMe(this.props.incident, this.props.user.id) && !this.isResolved(this.props.incident)) {
            return (
                <TouchableOpacity style={styles.btn}
                                  onPress={() => {this.props.onIncidentAccept(this.props.incident.id, this.props.user.id);}}>
                    <Text style={styles.btnText}>Volunteer</Text>
                </TouchableOpacity>
            )
        } else {
            return null;
        }
    }
}

let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        width: deviceWidth - 85,
        right: 40,
        bottom: 20,
        height: 42,
        backgroundColor: '#EE8380',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },


    images: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        width: deviceWidth / 3,
        height: deviceWidth / 3,
        borderWidth: 1,
        borderColor: 'white',
        resizeMode: "cover"
    },
    subTitle: {
        fontSize: 16,
        lineHeight: 25,
    },
    row: {
        flexDirection: 'row',
        marginTop: 3,
        marginBottom: 3,
    },
    uploadBtn: {
        flex: 1,
        backgroundColor: '#8ECCD8',
        height: 45,
        width: 60,
        borderRadius: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

module.exports = ActionButton;