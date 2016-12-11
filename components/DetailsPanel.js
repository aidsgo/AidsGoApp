import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Communications from 'react-native-communications';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {generateTimeString} from './../helper/Utils';
import I18n from '../helper/I18n';

class DetailsPanel extends Component {
    constructor(props) {
        super(props);
    }

    toggleBtn() {
        if (this.props.detailsPanelExpanded) {
            return (
                <TouchableOpacity style={[styles.collapseBtn, styles.toggleBtn]}
                                  onPress={this.props.onDetailsPanelHide}>
                    <IonIcon style={{color: "#545960", top: -12}} name='ios-arrow-down' size={45}/>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={[styles.expandBtn, styles.toggleBtn]}
                                  onPress={this.props.onDetailsPanelExpand}>
                    <IonIcon style={{color: "#545960"}} name='ios-arrow-up' size={40}/>
                </TouchableOpacity>
            )
        }
    }

    detailsPanel() {
        if (this.props.detailsPanelExpanded) {
            return (
                <ScrollView style={styles.panelContainer}>
                    <View style={styles.takenInfo}>
                        <Text>
                            <Text style={styles.bold}>{I18n.t('person', {count: this.props.incident.taken.size})}</Text>
                            <Text> {I18n.t('take_incident')}</Text>
                        </Text>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <View style={styles.time}>
                                <IonIcon style={{color: "#545960"}} name='md-time' size={23}/>
                                <Text style={{marginLeft: 10}}>{generateTimeString(this.props.incident.time)}</Text>
                            </View>

                            <View style={styles.incidentInfo}>
                                <Text>
                                    <Text style={styles.bold}>{this.props.incident.name}</Text>
                                    <Text>{I18n.t('need_help')}</Text>
                                </Text>
                                <Text
                                    style={{marginTop: 5}}> {I18n.t('distance', {distance: this.props.incident.distance || 500})}</Text>
                            </View>
                        </View>
                        <View style={styles.logo}>
                            <Image style={{width: 65, height: 65, resizeMode: 'contain'}}
                                   source={require('../public/img/logo.png')}/>
                        </View>
                    </View>

                    <View style={styles.contact}>
                        <View>
                            <Text style={styles.bold}>{I18n.t('emergency_call')}</Text>
                            <TouchableOpacity
                                onPress={() => Communications.phonecall(this.props.incident.emergency_call, true)}>
                                <Text style={styles.phone}>{this.props.incident.emergency_call}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.bold}>{I18n.t('property_management_company_phone')}</Text>
                            <TouchableOpacity
                                onPress={() => Communications.phonecall(this.props.incident.property_management_company_phone, true)}>
                                <Text
                                    style={styles.phone}>{this.props.incident.property_management_company_phone}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.toggleBtn()}
                {this.detailsPanel()}
            </View>
        );
    }
}

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 10,
        bottom: 85,
        width: deviceWidth - 20
    },
    collapseBtn: {
        top: -40
    },
    expandBtn: {
        top: -75,
        shadowColor: 'black',
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.5
    },
    toggleBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        right: (deviceWidth - 20) / 2 - 40
    },
    panelContainer: {
        padding: 15,
        backgroundColor: '#FFFFFF'
    },
    takenInfo: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#DADADA'
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5
    },
    incidentInfo: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderTopColor: '#DADADA',
        borderTopWidth: 2
    },
    logo: {
        paddingTop: 13,
        paddingBottom: 20,
        paddingRight: 30
    },
    contact: {
        paddingTop: 10,
        borderTopColor: '#DADADA',
        borderTopWidth: 2
    },
    bold: {
        fontWeight: 'bold'
    },
    phone: {
        color: '#51A7F9'
    }
});

module.exports = DetailsPanel;