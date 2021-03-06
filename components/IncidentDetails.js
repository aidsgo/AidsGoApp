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
import ImageUpload from '../components/ImageUpload'
import Icon from 'react-native-vector-icons/Ionicons'
import {Actions} from 'react-native-router-flux'

class IncidentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showImageUpload: false,
            detailsPanelExpanded: false
        }
    }

    onResolveBtnPressed() {
        this.setState({showImageUpload: true})
    }

    onCancelResolveBtnPressed() {
        this.setState({showImageUpload: false})
    }

    onDetailsPanelHide() {
        this.setState({detailsPanelExpanded: false})
    }

    onDetailsPanelExpand() {
        this.setState({detailsPanelExpanded: true})
    }

    content() {
        if (this.state.showImageUpload) {
            return (
                <ImageUpload {...this.props} onCancelResolveBtnPressed={this.onCancelResolveBtnPressed.bind(this)}/>
            )
        } else {
            return (
                <View>
                    <DetailsPanel incident={this.props.incident} detailsPanelExpanded={this.state.detailsPanelExpanded}
                                  onDetailsPanelHide={this.onDetailsPanelHide.bind(this)}
                                  onDetailsPanelExpand={this.onDetailsPanelExpand.bind(this)}/>
                    <ActionButton {...this.props} onResolveBtnPressed={this.onResolveBtnPressed.bind(this)}/>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.navBar}>
                    <TouchableOpacity style={styles.navLeft} onPress={() => Actions.pop()}>
                        <Icon style={{color: '#FFFFFF'}} name={'ios-arrow-back'} size={40}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.medKit} onPress={() => Actions.helpInstructionsList()}>
                        <Icon style={{color: '#FFFFFF'}} name={'ios-medkit'} size={40}/>
                    </TouchableOpacity>
                </View>
                <Map lat={this.props.incident.location.lat} lng={this.props.incident.location.lng}
                     volunteers={this.props.incident.taken} userId={this.props.user.profile.id}/>
                {this.content()}
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
    },
    navLeft:{
        position:'absolute',
        top:15,
        left:10
    },
    medKit:{
        position:'absolute',
        top:15,
        right:10
    }
});

module.exports = IncidentDetails;