import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
} from 'react-native'

import MapView from 'react-native-maps';

class Map extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MapView style={styles.map} showsUserLocation={true} followsUserLocation={true}
                     initialRegion={{
                                            latitude: this.props.lat,
                                            longitude: this.props.lng,
                                            latitudeDelta: 0.05,
                                            longitudeDelta: 0.05}}>
                <MapView.Marker
                    coordinate={{latitude: this.props.lat, longitude: this.props.lng}}>
                </MapView.Marker>
            </MapView>
        );
    }
}

const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    map: {
        height: deviceHeight
    }
});

module.exports = Map;