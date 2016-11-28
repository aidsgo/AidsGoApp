import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image
} from 'react-native'

import MapView from 'react-native-maps';

class Map extends Component {
    constructor(props) {
        super(props);
    }

    volunteers() {
        let volunteersMarker = [];
        this.props.volunteers.forEach((location, volunteerId) => {
            if (location) {
                volunteersMarker.push(
                    <MapView.Marker coordinate={{latitude: location.lat, longitude: location.lng}} key={volunteerId}>
                        <Image source={require('../public/img/leifeng-no-shadow.png')} style={{width: 30, height: 30}}/>
                    </MapView.Marker>
                )
            }
        });
        return volunteersMarker;
    }

    render() {
        return (
            <MapView style={styles.map} showsUserLocation={true} followsUserLocation={true}
                     initialRegion={{
                                            latitude: this.props.lat,
                                            longitude: this.props.lng,
                                            latitudeDelta: 0.05,
                                            longitudeDelta: 0.05}}>
                <MapView.Marker coordinate={{latitude: this.props.lat, longitude: this.props.lng}}>
                    <View>
                        <View style={styles.circleLarge}></View>
                        <View style={styles.circleMiddle}></View>
                        <View style={styles.circleSmall}></View>
                        <View style={styles.overlayLarge}></View>
                        <View style={styles.overlayMiddle}></View>
                        <View style={styles.overlaySmall}></View>
                    </View>
                </MapView.Marker>
                {this.volunteers()}
            </MapView>
        );
    }
}

const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    map: {
        height: deviceHeight
    },
    circleLarge: {
        position: 'absolute',
        width: 18,
        height: 18,
        borderRadius: 9,
        top: -9,
        left: -9,
        backgroundColor: '#C82506'
    },
    circleMiddle: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderRadius: 6,
        top: -6,
        left: -6,
        backgroundColor: '#F5F3F0'
    },
    circleSmall: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,
        top: -4,
        left: -4,
        backgroundColor: '#C82506'
    },
    overlayLarge: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        top: -140,
        left: -140,
        backgroundColor: '#EC5D57',
        opacity: 0.08
    },
    overlayMiddle: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
        top: -90,
        left: -90,
        backgroundColor: '#EC5D57',
        opacity: 0.1
    },
    overlaySmall: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        top: -40,
        left: -40,
        backgroundColor: '#EC5D57',
        opacity: 0.2
    }
});

module.exports = Map;