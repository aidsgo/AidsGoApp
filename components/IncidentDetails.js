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
import DetailsPanel from '../components/DetailsPanel'

import MapView from 'react-native-maps';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

class IncidentDetails extends Component {
    constructor(props) {
        super(props);
    }

    isTakenByMe(incident, userId) {
        return !!incident.taken.find(volunteerId => volunteerId === userId)
    }

    isResolved(incident) {
        return incident.resolved;
    }

    renderButtons() {
        if (this.isTakenByMe(this.props.incident, this.props.user.id) && !this.isResolved(this.props.incident)) {
            return (
                <View style={{alignItems: 'center', position: 'absoulte', right: 0, bottom: 0}}>
                    <TouchableOpacity style={styles.resolveBtn}
                                      onPress={() => {this.props.onIncidentResolve(this.props.incident.id, this.props.user.id); Actions.pop()}}>
                        <Text style={styles.btnText}>Resolve</Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (!this.isTakenByMe(this.props.incident, this.props.user.id) && !this.isResolved(this.props.incident)) {
            return (
                <View style={styles.row}>
                    <TouchableOpacity style={styles.btn}
                                      onPress={() => {this.props.onIncidentAccept(this.props.incident.id, this.props.user.id); Actions.pop()}}>
                        <Text style={styles.btnText}>Volunteer</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    };

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
        return (
            <View style={styles.container}>
                <MapView style={styles.map} showsUserLocation={false} followsUserLocation={true}
                         initialRegion={{
                                            latitude: this.props.incident.location.lat,
                                            longitude: this.props.incident.location.lng,
                                            latitudeDelta: 0.05,
                                            longitudeDelta: 0.05}}>
                    <MapView.Marker
                       coordinate={{latitude: this.props.incident.location.lat, longitude: this.props.incident.location.lng}}>
                    </MapView.Marker>
                </MapView>
                <DetailsPanel incident={this.props.incident} style={styles.detailsPanel}></DetailsPanel >
                {this.renderButtons()}
            </View>

        );
    }
}

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)',
        marginTop: 64,
    },
    map: {
        height: deviceHeight - 20,
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
    btn: {
        flex: 1,
        backgroundColor: '#EE8380',
        height: 40,
        width: 100,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    resolveBtn: {
        flex: 1,
        backgroundColor: '#EE8380',
        width: deviceWidth,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

module.exports = IncidentDetails;