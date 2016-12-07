import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    Image
} from 'react-native'

import MapView from 'react-native-baidumap';

class Map extends Component {
    volunteerMarkers() {
        let volunteersMarker = [];
        const that = this;
        this.props.volunteers.forEach((location, volunteerId) => {
            if (location && location.lat && location.lng && volunteerId != that.props.userId) {
                volunteersMarker.push({
                    latitude: location.lat,
                    longitude: location.lng,
                    image: require('../public/img/80.png')
                });
            }
        });
        return volunteersMarker;
    }

    incidentMarker() {
        return {
            latitude: this.props.lat,
            longitude: this.props.lng,
            image: require('../public/img/avatar.png')
        }
    }

    render() {
        return (
            <MapView
                style={styles.map}
                showsUserLocation={true}
                userLocationViewParams={{accuracyCircleFillColor: 'blue'}}
                annotations={[...this.volunteerMarkers(), this.incidentMarker()]}
            />
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