import React, {Component} from 'react';
import {
    Platform,
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
                    image: require('../public/img/hero-map.png')
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

    points() {
        let points = [];
        this.props.volunteers.forEach((location, volunteerId) => {
            if (location && location.lat && location.lng) {
                points.push([location.lat, location.lng])
            }
        });
        points.push([this.props.lat, this.props.lng]);
        return points;
    }

    componentDidMount() {
        this.refs["mapView"].zoomToLocs(this.points());
    }

    render() {
        return (
            <MapView
                style={styles.map}
                ref="mapView"
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
        height: (Platform.OS === 'ios') ? deviceHeight : deviceHeight - 24
    }
});

module.exports = Map;