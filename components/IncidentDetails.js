import React, {Component} from 'react';
import {View} from 'react-native'

import Map from '../components/Map'
import DetailsPanel from '../components/DetailsPanel'
import ActionButton from '../components/ActionButton'

class IncidentDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Map lat={this.props.incident.location.lat} lng={this.props.incident.location.lng}/>
                <DetailsPanel incident={this.props.incident}/>
                <ActionButton {...this.props}/>
            </View>
        );
    }
}

module.exports = IncidentDetails;