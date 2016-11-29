import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment'

class IncidentDescription extends Component {
    generateTimeString = (time) => {
        const IncidentTime = moment(time);
        return IncidentTime.format('YYYY-MM-DD HH:MM')
    };

    render() {
        const iconName = this.props.incident.resolved ? 'check' : 'exclamation';
        return (
            <TouchableOpacity style={[styles.container, styles.shadow]}
                              onPress={() => Actions.incidentDetailsContainer({incident: this.props.incident})}>
                <LinearGradient colors={['#FF807C', '#E7736E']} style={styles.indicator}>
                    <FAIcon style={{color: 'white'}} name={iconName} size={24}/>
                </LinearGradient>
                <View style={styles.details}>
                    <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                        <IonIcon style={{color: "#545960"}} name='md-time' size={22}/>
                        <Text
                            style={{fontSize: 14, marginTop: 2, paddingLeft: 10}}>{this.generateTimeString(this.props.incident.time)}</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 14}}>
                            <Text style={{fontWeight: 'bold'}}>{this.props.incident.name}</Text>
                            <Text> need your help!</Text>
                        </Text>
                        <Text style={{marginTop: 2, fontSize: 14}}>
                            <Text style={{fontWeight: 'bold'}}>{this.props.incident.distance}</Text>
                            <Text> meters away from you.</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.logo}>
                    <Image style={{width: 50, height: 50, resizeMode: 'contain'}}
                           source={require('../public/img/logo.png')}></Image>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: '#FFFFFF'
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            height: 0.2,
            width: 0
        },
        shadowOpacity: 0.2
    },
    indicator: {
        width: 40,
        backgroundColor: '#F07D7A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    details: {
        flex: 1,
        padding: 15,
        paddingLeft: 20
    },
    logo: {
        width: 55,
        paddingTop: 10
    }
});

module.exports = IncidentDescription;
