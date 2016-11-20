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
                        <Icon style={{color: '#FFFFFF',  top: 20, left: 30}} name={'ios-arrow-back'} size={40}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Actions.helpInstructionsList()}>
                        <Icon style={{color: '#FFFFFF', top: 20, right: 30}} name={'ios-medkit'} size={40}/>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        width: deviceWidth,
        height: 65,
        zIndex: 10,
        backgroundColor: '#53585F',
        opacity: 0.4
    }
});

module.exports = IncidentDetails;