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

class DetailsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelExpanded: true
        }
    }

    hide() {
        this.setState({
            panelExpanded: false
        })
    }

    expand() {
        this.setState({
            panelExpanded: true
        })
    }

    toggleBtn() {
        if (this.state.panelExpanded) {
            return (
                <TouchableOpacity style={styles.toggleBtn} onPress={this.hide.bind(this)}>
                    <IonIcon style={{color: "#545960"}} name='ios-arrow-down' size={40}/>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.toggleBtn} onPress={this.expand.bind(this)}>
                    <IonIcon style={{color: "#545960"}} name='ios-arrow-up' size={40}/>
                </TouchableOpacity>
            )
        }
    }

    detailsPanel() {
        if (this.state.panelExpanded) {
            return (
                <ScrollView style={styles.panelContainer}>
                    <View style={styles.takenInfo}>
                        <Text>
                            <Text style={styles.bold}>{this.props.incident.taken.size} person</Text>
                            <Text> have taken this incident!</Text>
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
                                    <Text> need your help!</Text>
                                </Text>
                                <Text style={{marginTop: 5}}>
                                    <Text style={styles.bold}>{this.props.incident.distance}</Text>
                                    <Text> meters away from you.</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.logo}>
                            <Image style={{width: 65, height: 65, resizeMode: 'contain'}}
                                   source={require('../public/img/logo.png')}></Image>
                        </View>
                    </View>

                    <View style={styles.contact}>
                        <View>
                            <Text style={styles.bold}>Emergency Call: </Text>
                            <TouchableOpacity
                                onPress={() => Communications.phonecall(this.props.incident.emergency_call, true)}>
                                <Text style={styles.phone}>{this.props.incident.emergency_call}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.bold}>Property Management Company: </Text>
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
    toggleBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        right: deviceWidth / 2 - 30,
        top: -50
    },
    panelContainer: {
        padding: 15,
        marginTop: 20,
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