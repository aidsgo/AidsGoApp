import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'

import Map from '../components/Map'
import DetailsPanel from '../components/DetailsPanel'
import ActionButton from '../components/ActionButton'
import Icon from 'react-native-vector-icons/Ionicons'
import {Actions} from 'react-native-router-flux'

class IncidentDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon style={styles.backIcon} name={'ios-arrow-back'} size={40}/>
                    </TouchableOpacity>
                </View>
                <Map lat={this.props.incident.location.lat} lng={this.props.incident.location.lng}/>
                <DetailsPanel incident={this.props.incident}/>
                <ActionButton {...this.props}/>
            </View>
        );
    }
}

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    navBar: {
        position: 'absolute',
        width: deviceWidth,
        height: 65,
        zIndex: 10,
        backgroundColor: '#53585F',
        opacity: 0.32,
    },
    backIcon: {
        top: 20,
        left: 30,
        color: '#FFFFFF'
    }
});

module.exports = IncidentDetails;